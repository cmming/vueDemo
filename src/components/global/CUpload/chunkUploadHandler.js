import {
  // eslint-disable-next-line
  default as request,
  createRequest,
  sendFormRequest
} from 'vue-upload-component/src/utils/request'
import { Notification } from 'element-ui'
import SparkMD5 from 'spark-md5'

export default class ChunkUploadHandler {
  /**
     * Constructor
     *
     * @param {File} file
     * @param {Object} options
     */
  constructor (file, options) {
    this.file = file
    this.options = options
  }

  /**
     * Gets the max retries from options
     */
  get maxRetries () {
    return parseInt(this.options.maxRetries)
  }

  /**
     * Gets the max number of active chunks being uploaded at once from options
     */
  get maxActiveChunks () {
    return parseInt(this.options.maxActive)
  }

  /**
     * Gets the file type
     */
  get fileType () {
    return this.file.type
  }

  /**
     * Gets the file size
     */
  get fileSize () {
    return this.file.size
  }

  /**
     * Gets the file name
     */
  get fileName () {
    return this.file.name
  }

  /**
     * Gets action (url) to upload the file
     */
  get action () {
    return this.options.action || null
  }

  /**
     * Gets the body to be merged when sending the request in start phase
     */
  get startBody () {
    return this.options.startBody || {}
  }

  /**
     * Gets the body to be merged when sending the request in upload phase
     */
  get uploadBody () {
    return this.options.uploadBody || {}
  }

  /**
     * Gets the body to be merged when sending the request in finish phase
     */
  get finishBody () {
    return this.options.finishBody || {}
  }

  /**
     * Gets the headers of the requests from options
     */
  get headers () {
    return this.options.headers || {}
  }

  /**
     * Whether it's ready to upload files or not
     */
  get readyToUpload () {
    return !!this.chunks
  }

  /**
     * Gets the progress of the chunk upload
     * - Gets all the completed chunks
     * - Gets the progress of all the chunks that are being uploaded
     */
  get progress () {
    const completedProgress = (this.chunksUploaded.length / this.chunks.length) * 100
    const uploadingProgress = this.chunksUploading.reduce((progress, chunk) => {
      return progress + ((chunk.progress | 0) / this.chunks.length)
    }, 0)

    return Math.min(completedProgress + uploadingProgress, 100)
  }

  /**
     * Gets all the chunks that are pending to be uploaded
     */
  get chunksToUpload () {
    return this.chunks.filter(chunk => {
      return !chunk.active && !chunk.uploaded
    })
  }

  /**
     * Whether there are chunks to upload or not
     */
  get hasChunksToUpload () {
    return this.chunksToUpload.length > 0
  }

  /**
     * Gets all the chunks that are uploading
     */
  get chunksUploading () {
    return this.chunks.filter(chunk => {
      return !!chunk.xhr && !!chunk.active
    })
  }

  /**
     * Gets all the chunks that have finished uploading
     */
  get chunksUploaded () {
    return this.chunks.filter(chunk => {
      return !!chunk.uploaded
    })
  }

  fileMd5 () {
    return this.file.md5
  }

  /**
     * Creates all the chunks in the initial state
     */
  createChunks () {
    this.chunks = []

    let start = 0
    let end = this.chunkSize
    while (start < this.fileSize) {
      this.chunks.push({
        blob: this.file.file.slice(start, end),
        startOffset: start,
        active: false,
        retries: this.maxRetries
      })
      start = end
      end = start + this.chunkSize
    }
  }

  /**
     * Updates the progress of the file with the handler's progress
     */
  updateFileProgress () {
    this.file.progress = this.progress
  }

  /**
     * Paues the upload process
     * - Stops all active requests
     * - Sets the file not active
     */
  pause () {
    this.file.active = false
    this.stopChunks()
  }

  /**
     * Stops all the current chunks
     */
  stopChunks () {
    this.chunksUploading.forEach(chunk => {
      chunk.xhr.abort()
      chunk.active = false
    })
  }

  /**
     * Resumes the file upload
     * - Sets the file active
     * - Starts the following chunks
     */
  resume () {
    this.file.active = true
    this.startChunking()
  }

  /**
     * Starts the file upload
     *
     * @returns Promise
     * - resolve  The file was uploaded
     * - reject   The file upload failed
     */
  upload () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    // 优化文件的MD5计算
    if (this.file.md5 === undefined) {
      this.getFileMD5(this.file.file, process => {
        // eslint-disable-next-line
            console.log(process)
      }, md5 => {
        this.fileMd5 = md5
        this.file.md5 = md5
        this.start()
      })
    } else {
      this.start()
    }

    return this.promise
  }

  /**
     * Start phase
     * Sends a request to the backend to initialise the chunks
     */
  start () {
    request({
      method: 'POST',
      headers: Object.assign({}, this.headers, {
        'Content-Type': 'application/json'
      }),
      url: this.action,
      body: Object.assign(this.startBody, {
        phase: 'start',
        mime_type: this.fileType,
        size: this.fileSize,
        name: this.fileName,
        md5: this.fileMd5
      })
    }).then(res => {
      if (res.status !== 'success') {
        this.file.response = res
        Notification({
          type: 'error',
          message: res.message
        })
        return this.reject('server')
      }

      this.sessionId = res.data.session_id
      this.chunkSize = parseInt(res.data.end_offset)

      this.createChunks()
      this.startChunking()
    }).catch(res => {
      this.file.response = res
      this.reject('server')
    })
  }

  /**
     * Starts to upload chunks
     */
  startChunking () {
    for (let i = 0; i < this.maxActiveChunks; i++) {
      this.uploadNextChunk()
    }
  }

  /**
     * Uploads the next chunk
     * - Won't do anything if the process is paused
     * - Will start finish phase if there are no more chunks to upload
     */
  uploadNextChunk () {
    if (this.file.active) {
      if (this.hasChunksToUpload) {
        return this.uploadChunk(this.chunksToUpload[0])
      }

      if (this.chunksUploading.length === 0) {
        return this.finish()
      }
    }
  }

  /**
     * Uploads a chunk
     * - Sends the chunk to the backend
     * - Sets the chunk as uploaded if everything went well
     * - Decreases the number of retries if anything went wrong
     * - Fails if there are no more retries
     *
     * @param {Object} chunk
     */
  uploadChunk (chunk) {
    chunk.progress = 0
    chunk.active = true
    this.updateFileProgress()
    chunk.xhr = createRequest({
      method: 'POST',
      headers: this.headers,
      url: this.action
    })

    chunk.xhr.upload.addEventListener('progress', function (evt) {
      if (evt.lengthComputable) {
        chunk.progress = Math.round(evt.loaded / evt.total * 100)
      }
    }, false)

    sendFormRequest(chunk.xhr, Object.assign(this.uploadBody, {
      phase: 'upload',
      session_id: this.sessionId,
      start_offset: chunk.startOffset,
      chunk: chunk.blob,
      chunks: parseInt(chunk.startOffset / this.chunkSize),
      md5: this.fileMd5
    })).then(res => {
      chunk.active = false
      if (res.status === 'success') {
        chunk.uploaded = true
      } else {
        if (chunk.retries-- <= 0) {
          this.stopChunks()
          return this.reject('upload')
        }
      }

      this.uploadNextChunk()
    }).catch(() => {
      chunk.active = false
      if (chunk.retries-- <= 0) {
        this.stopChunks()
        return this.reject('upload')
      }

      this.uploadNextChunk()
    })
  }

  /**
     * Finish phase
     * Sends a request to the backend to finish the process
     */
  finish () {
    this.updateFileProgress()

    request({
      method: 'POST',
      headers: Object.assign({}, this.headers, {
        'Content-Type': 'application/json'
      }),
      url: this.action,
      body: Object.assign(this.finishBody, {
        phase: 'finish',
        session_id: this.sessionId,
        size: this.fileSize,
        name: this.fileName,
        chunks: this.chunks.length,
        md5: this.fileMd5
      })
    }).then(res => {
      this.file.response = res
      if (res.status !== 'success') {
        Notification({
          type: 'error',
          message: res.message
        })
        return this.reject('server')
      }

      this.resolve(res)
    }).catch(res => {
      this.file.response = res
      this.reject('server')
    })
  }

  /**
     *
     * @param {*} file 文件
     * @param {*} callback 计算成功回调
     */
  getFileMD5 (file, progress, callback) {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    let chunkSize = 2097152 // Read in chunks of 2MB
    let chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    let spark = new SparkMD5.ArrayBuffer()
    let fileReader = new FileReader()

    fileReader.onload = function (e) {
      progress(parseInt((currentChunk + 1) / chunks * 100))
      // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
      spark.append(e.target.result) // Append array buffer
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        callback(spark.end())
        // console.log('finished loading');
        // eslint-disable-next-line
                console.info('computed hash', spark.end());  // Compute hash
      }
    }

    fileReader.onerror = function () {
      // eslint-disable-next-line
            console.warn('oops, something went wrong.');
    }

    function loadNext () {
      var start = currentChunk * chunkSize
      var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext()
  }
}

<template>
  <div
    :ref="dataId"
    :id="dataId"
    class="app-box"
  >
    <slot></slot>
  </div>
</template>
<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import io from 'socket.io-client'
var terminalNum = +new Date()
export default {
  props: {
    dataId: {
      type: String,
      default: () => {
        return `terminal-${terminalNum++}`
      }
    },
    msgId: {
      type: String,
      default: () => {
        return `msg-${terminalNum++}`
      }
    },
    sshConfig: {
      default: () => {}
    }
  },
  data () {
    return {
      term: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.$emit('terminal', this)
    })
  },
  methods: {
    createSsh () {
      // 清空元素内部
      // document.getElementById(this.dataId).innerHTML = ''
      // 销毁前一个，避免重建
      this.term && this.term.dispose()
      this.term = new Terminal()
      const fitAddon = new FitAddon()
      this.term.loadAddon(fitAddon)
      this.term.open(document.getElementById(this.dataId))
      fitAddon.fit()

      // const socket = io('http://localhost:280/ssh')
      console.log(process.env.VUE_APP_TERM_WEBSCOKET_SERVER)
      const socket = io(process.env.VUE_APP_TERM_WEBSCOKET_SERVER)
      socket.emit('createNewServer', {
        msgId: this.msgId,
        ...this.sshConfig
      })
      this.term.onData(data => {
        socket.emit(this.msgId, data)
      })
      socket.on(this.msgId, data => {
        // console.log(data, this.term);
        this.term.write(data)
      })
    }
  }
}
</script>

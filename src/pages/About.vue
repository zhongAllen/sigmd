<!-- @format -->

<template>
  <PreviewVditor :pdata="pdata" @callback="handleCallBack" />
</template>

<script>
import PreviewVditor from '@components/PreviewVditor'
import AboutSigmateMd from '@config/aboutSigmate'

export default {
  name: 'about-sigmate',

  data() {
    return {
      isLoading: true,
      pdata: AboutSigmateMd
    }
  },

  created() {},

  components: {
    PreviewVditor
  },

  mounted() {},

  methods: {
    handleCallBack() {
      this.isLoading = false
    }
  }
}
</script>

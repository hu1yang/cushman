export interface ICommon {
  showLeft: boolean
}

export default {
  state:{
    showLeft:false
  } as ICommon,
  reducers:{
    setShowLeft(state:ICommon, {payload}:{payload:boolean}){
      return {
        ...state,
        showLeft: payload
      }
    }
  }
}

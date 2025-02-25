import React , {createContext , ReactNode ,  useReducer , useContext} from "react";

// 定义模块的类型
interface MapState {
  mapRef: AMap.Map | null;
  winRef: AMap.InfoWindow|null;
  current_id:null|number;
}
// 创建提供者组件
interface ModuleProviderProps {
  children: ReactNode;
}

// 定义 action 类型
interface INIT_MAPAction<T = any> {
  type: 'INIT_MAP'|'INIT_WIN'|'SET_CURRENT_ID';
  payload: T;
}
// 可以定义不同的 Action 类型
interface SetCurrentIdAction {
  type: 'SET_CURRENT_ID';
  payload: { id: number };
}

interface InitMapAction {
  type: 'INIT_MAP';
  payload: AMap.Map;  // 根据实际需求修改
}

interface InitWinAction {
  type: 'INIT_WIN';
  payload: AMap.InfoWindow;  // 根据实际需求修改
}

type Action = SetCurrentIdAction | InitMapAction | InitWinAction;
// 将所有的 action 合并为一个联合类型

// 定义 reducer 的状态类型


const MapContext = createContext<any>(null)

const mapReducer = (state:MapState,action:Action):MapState => {
  switch (action.type) {
    case 'INIT_MAP':
      return {...state, mapRef:action.payload};
    case 'INIT_WIN':
      return {...state, winRef:action.payload};
    case 'SET_CURRENT_ID':
      return {...state, current_id:action.payload.id}
    default:
      return state;
  }
}

const initMapData: MapState = {
  mapRef:null,
  winRef:null,
  current_id:null
}

const MapReducer: React.FC<ModuleProviderProps> = ({children}) => {
  const [state,dispatch] = useReducer(mapReducer, initMapData)
  return (
      <MapContext.Provider value={[state,dispatch]}>
        {children}
      </MapContext.Provider>
  )
}

export default MapReducer

export const useMApContext = () => useContext(MapContext);

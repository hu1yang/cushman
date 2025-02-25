import React, { useEffect , useState , useRef , useMemo , useContext , useCallback } from 'react';
import {
  Map,
  APILoader,
  Marker,
  InfoWindow
} from "@uiw/react-amap";
import MarkersComponent from './markersComponent'
import {Province, district, datas} from '@/assets/data/map'
import {useMApContext} from "@/reducer/map";
import InfoWindowsComponent from './InfoWindowsComponent'
import ReactDOMServer from 'react-dom/server';


function debounce<T extends (...args: any[]) => void>(fnc: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);  // 清除之前的定时器
      timer = null;
    }

    // 使用箭头函数保证 `this` 指向正确
    timer = setTimeout(() => {
      fnc(...args);  // 正确传递参数
    }, delay);
  };
}
const MapComponent = () => {
  const [state,dispatch] = useMApContext()
  const [zoom, setZoom] = useState<number>(4);
  const [mapData, setMapData] = useState<any[]>([]);
  const [region, setRegion] = useState<1|2|3>(1);
  const [infoWIndowData, setInfoWIndowData] = useState<any>({});


  const changeZoom = () => {
    const zoomIndex = state.mapRef.getZoom()
    if(zoomIndex <= 7){
      setRegion(1)
    }else if(zoomIndex <= 10){
      setRegion(2)
    }else if(zoomIndex > 10){
      setRegion(3)
    }
    setZoom(zoomIndex)
  }

  const clickMark = useCallback((position:string[],id:number) => {
    if([1,2].includes(region)){
      state.mapRef.setZoomAndCenter(region === 1?8:11,position)
    }else{
      state.mapRef.setZoomAndCenter(12,position)
      state.winRef.open(state.mapRef, position)
      dispatch({type:'SET_CURRENT_ID',payload:{id}})
      const data = datas.find(a => a.id === id)
      setInfoWIndowData(data)
    }
  },[region,state]);
  const closeInfoWin = () => {
    setInfoWIndowData({})
  }

  useEffect(() => {
    if(region === 1){
      setMapData(Province)
    }else if(region === 2){
      setMapData(district)
    }else{
      setMapData(datas)
    }
  }, [region]);
  return (
      <APILoader akey='53dc73251a8b67316fad3f0cc11b77d9'>
        <Map zoom={zoom} ref={(instance:AMap.Map) => {
          if (instance && instance.map && !state.mapRef) {
            dispatch({type:'INIT_MAP',payload:instance.map as AMap.Map})
          }
        }} onZoomEnd={changeZoom}>
          {
            mapData.map((mapDatum) => (
                <Marker position={mapDatum.position} key={mapDatum.value|| mapDatum.id} >
                  <MarkersComponent zoom = {zoom} item={mapDatum} clickMark={clickMark} />
                </Marker>
            ))
          }
          <InfoWindow ref={(instance:AMap.InfoWindow) => {
            if(instance && instance.infoWindow && !state.winRef){
              dispatch({type:'INIT_WIN',payload:instance.infoWindow as AMap.InfoWindow})
            }
          }} offset={{ x: 15, y: -10}} onClose={closeInfoWin} content={ReactDOMServer.renderToString(<InfoWindowsComponent data={infoWIndowData} />)} closeWhenClickMap={true} />
        </Map>
      </APILoader>
  )
};

export default MapComponent;

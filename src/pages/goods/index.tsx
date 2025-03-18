import {useRef , useState , useEffect} from 'react'
import styles from './index.less'
import {List } from 'antd'
import VirtualList from 'rc-virtual-list';


const data = new Array(1000).fill(null).map((_, i) => ({
    id: i,
    picture: 'https://cdn.toodudu.com/2022/04/25/TZKsTBppzFDZAhrLUGGDmhwTWgJKEJH1yHWQD1pf.jpg',
    title: `标题 ${i + 1}：这是一个很长的标题示例 ${i + 1}`,
    labels: ["包邮", "百亿补贴", "12期免息", "额外优惠", "限时抢购"],
    height: Math.random() * (300 - 200) + 200 // 随机高度
}));
const Goods = () => {
    const [heights, setHeights] = useState<number[]>(new Array(data.length).fill(0));
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const updateItemHeight = (index: number) => {
        const ref = itemRefs.current[index];
        if (ref) {
            setHeights((prevHeights) => {
                const newHeights = [...prevHeights];
                newHeights[index] = ref.getBoundingClientRect().height;
                return newHeights;
            });
        }
    };

    useEffect(() => {
        // 延迟计算所有项的高度
        const timer = setTimeout(() => {
            data.forEach((_, index) => updateItemHeight(index));
        }, 0);
        return () => clearTimeout(timer);
    }, []);
    const getItemHeight = (index:any) => {
        return Number(heights[index]) || 200;
    };
    return (
        <div className={styles.goodsContainer}>
            <List>
                <VirtualList
                    data={data}
                    height={800}
                    itemHeight={200}
                    itemKey="id"
                >
                    {(item,index) => (
                        <List.Item key={item.id}>
                            <div className={styles.goodsBox} ref={(el) => (itemRefs.current[index] = el)} style={{ height: item.height }}>
                                <div className={styles.picture}>
                                    <img
                                        src="https://cdn.toodudu.com/2022/04/25/TZKsTBppzFDZAhrLUGGDmhwTWgJKEJH1yHWQD1pf.jpg"
                                        alt=""/>
                                </div>
                                <div className={styles.goodsInfo}>
                                    <h1>{item.title}</h1>
                                    <div className={styles.goodsLabels}>
                                        {
                                            item.labels.map((tag, tagindex) => {
                                                return (
                                                    <div key={tagindex} className={styles.goodsLabel}>
                                                        {tag}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    )}

                </VirtualList>
            </List>

        </div>
    );
};

export default Goods;

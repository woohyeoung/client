// Install
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// User
import { findAllByRoom, findAllByVehicle } from 'store/actions/CalendarAction';
import { selectByVId, selectByRId } from 'store/actions/WebsocketAction';
import {
    HalfWidthFrame,
    ComponentFrame,
    CardFrame,
    ListFrame,
    ItemFrame,
    ImgCard,
    InsideFrame,
    TextFrame,
    TextTitle,
    TextContent,
    ContentFrame,
    SubContentFrame,
    CustomButton,
    TextSubTitle
} from './SelectTableStyle';

export function ImgCardList(props) {
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        setImgs(props.data || props);
    }, [props]);

    var settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <ImgCard width={props.width} height={props.height}>
            <Slider {...settings}>
                {imgs?.length > 0 &&
                    imgs?.map((item, i) => {
                        return (
                            <ImgCard key={i} width={props.width} height={props.height}>
                                <img
                                    src={item?.imgPath || item}
                                    alt="자원이미지"
                                    style={{ height: '100%', width: '100%', borderRadius: '20px' }}
                                />
                            </ImgCard>
                        );
                    })}
            </Slider>
        </ImgCard>
    );
}

const RoomTableCard = (item) => {
    return (
        <div>
            <InsideFrame>
                {item.props && item.props.imgList.length ? <ImgCardList data={item.props.imgList} width={'250'} height={'157'} /> : <></>}
                <TextFrame>
                    <TextTitle props={'15'}>{item.props.content}</TextTitle>
                    <ContentFrame>
                        <SubContentFrame>
                            <TextContent props={'20'}>{item.props.categoryName}</TextContent>
                        </SubContentFrame>
                        <SubContentFrame>
                            <TextContent props={'15'}>방번호 : {item.props.roomNo}</TextContent>
                            <TextContent props={'15'}>인원수 : {item.props.capacity}</TextContent>
                        </SubContentFrame>
                    </ContentFrame>
                </TextFrame>
            </InsideFrame>
        </div>
    );
};

const VehicleTableCard = (item) => {
    return (
        <div>
            <InsideFrame>
                {item.props && item.props.imgList.length ? <ImgCardList data={item.props.imgList} width={'250'} height={'157'} /> : <></>}
                <TextFrame>
                    <TextTitle props={'25'}>{item.props.name}</TextTitle>
                    <ContentFrame>
                        <SubContentFrame>
                            <TextContent props={'15'}>차종 : {item.props.model}</TextContent>
                            <TextContent props={'15'}>차량 번호 : {item.props.number}</TextContent>
                            <TextContent props={'15'}>탑승 인원 : {item.props.capacity}</TextContent>
                        </SubContentFrame>
                    </ContentFrame>
                </TextFrame>
            </InsideFrame>
        </div>
    );
};

const SelectRoomTable = (item) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);
    const [rid, setRId] = useState(0);
    const resetStore = useSelector((state) => state.websocketReducer.resetdata);
    const [itemList, setItemList] = useState([]);
    const [propsItem, setPropsItem] = useState([]);

    const selectedCard = (idx) => {
        let copyList = [...itemList];
        copyList = copyList.map((v, i) => (i === idx ? (v === 1 ? 0 : 1) : 0));
        setItemList(copyList);
    };

    useEffect(() => {
        setSelected(false);
    }, []);
    useEffect(() => {
        setPropsItem(item.props);
    }, [item, itemList]);
    useEffect(() => {
        let copyList = [];
        if (item.props.length > 0) {
            item.props.map((v) => copyList.push(0));
            setItemList(copyList);
        }
    }, []);
    useEffect(() => {
        if (resetStore && resetStore.ready) {
            setRId(0);
        }
    }, [resetStore]);
    useEffect(() => {
        if (selected) {
            dispatch(selectByRId(rid));
            setSelected(false);
        }
    }, [selected]);
    return (
        <ListFrame>
            {propsItem ? (
                propsItem.map((i, idx) => (
                    <ItemFrame
                        key={idx}
                        onClick={() => {
                            setRId(i.roomId);
                            setSelected(true);
                            selectedCard(idx);
                        }}
                    >
                        <CardFrame props={itemList[idx]}>
                            <RoomTableCard props={i} />
                        </CardFrame>
                    </ItemFrame>
                ))
            ) : (
                <></>
            )}
        </ListFrame>
    );
};

const SelectVehicleTable = (item) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);
    const [vid, setVId] = useState(0);
    const [itemList, setItemList] = useState([]);
    const [propsItem, setPropsItem] = useState([]);

    const selectedCard = (idx) => {
        let copyList = [...itemList];
        copyList = copyList.map((v, i) => (i === idx ? (v === 1 ? 0 : 1) : 0));
        setItemList(copyList);
    };
    useEffect(() => {
        setSelected(false);
    }, []);
    useEffect(() => {
        setPropsItem(item.props);
    }, [item, itemList]);
    useEffect(() => {
        let copyList = [];
        if (item.props.length > 0) {
            item.props.map((v) => copyList.push(0));
            setItemList(copyList);
        }
    }, []);
    useEffect(() => {
        if (selected) {
            dispatch(selectByVId(vid));
        }
    }, [selected]);

    return (
        <div>
            <ListFrame>
                {propsItem ? (
                    propsItem.map((i, idx) => (
                        <ItemFrame
                            key={idx}
                            onClick={() => {
                                setVId(i.id);
                                setSelected(true);
                                selectedCard(idx);
                            }}
                        >
                            <CardFrame props={itemList[idx]}>
                                <VehicleTableCard props={i} />
                            </CardFrame>
                        </ItemFrame>
                    ))
                ) : (
                    <></>
                )}
            </ListFrame>
        </div>
    );
};

const SelectTableService = () => {
    const dispatch = useDispatch();
    const productTypeStore = useSelector((state) => state.websocketReducer.product);
    const nextStepOneToTwoStore = useSelector((state) => state.nextReducer.onetotwo);
    const vehicleStore = useSelector((state) => state.calendarReducer.allVehicle);
    const roomStore = useSelector((state) => state.calendarReducer.allRoom);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [type, setType] = useState(null);

    useEffect(() => {
        if (productTypeStore && productTypeStore.data !== null) {
            setType(productTypeStore.data);
        }
    }, [productTypeStore]);

    useEffect(() => {
        if (nextStepOneToTwoStore && nextStepOneToTwoStore.ready) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [nextStepOneToTwoStore]);
    useEffect(() => {
        dispatch(findAllByVehicle());
        dispatch(findAllByRoom());
    }, []);
    useEffect(() => {
        if (type !== null) {
            if (type === 1) {
                if (vehicleStore.data) {
                    setItem([...vehicleStore.data.data.value]);
                }
            } else {
                if (roomStore.data) {
                    setItem([...roomStore.data.data.value]);
                }
            }
        }
    }, [type, vehicleStore, roomStore]);
    return (
        <>
            {loading && item ? (
                <></>
            ) : type === 0 ? (
                <HalfWidthFrame visible={!loading}>
                    <ComponentFrame>
                        <SelectRoomTable props={item} />
                    </ComponentFrame>
                </HalfWidthFrame>
            ) : (
                <HalfWidthFrame visible={!loading}>
                    <ComponentFrame>
                        <SelectVehicleTable props={item} />
                    </ComponentFrame>
                </HalfWidthFrame>
            )}
        </>
    );
};

export const SelectTableFrame = () => {
    return <SelectTableService />;
};

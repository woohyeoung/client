import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myReservationRoomList, myReservationVehicleList } from 'store/actions/ReservationAction';
import { ItemChangeSave } from 'store/actions/ChangeAction';
import './MyReservationList.scss';
import MyReservationCard from './MyReservationCard';
import Loading from '../Loading';

function MyReservationList() {
    const reservationStore = useSelector((state) => state.reservationReducer);

    const changeStoreSelect = useSelector((state) => state.changeReducer.selected);

    const roomDeleteId = useSelector((state) => state.changeReducer.deleteRoomId);
    const vehicleDeleteId = useSelector((state) => state.changeReducer.deleteVehicleId);

    const changeStoreRoomItem = useSelector((state) => state.changeReducer.roomItem);
    const changeStoreVehicleItem = useSelector((state) => state.changeReducer.vehicleItem);
    const changeDeleteFlag = useSelector((state) => state.changeReducer.changeDeleteCount);

    const [start, isStart] = useState(false);
    const [start2, isStart2] = useState(false);

    const dispatch = useDispatch();

    const [reqRoomLastId, setReqRoomLastId] = useState(0);
    const [reqVehicleLastId, setReqVehicleLastId] = useState(0);

    const [reqRoom, setReqRoom] = useState({
        lastId: 0,
        limit: 5
    });
    const [reqVehicle, setReqVehicle] = useState({
        lastId: reqVehicleLastId,
        limit: 5
    });

    const [resRoomList, setResRoomList] = useState([]);
    const [resVehicleList, setResVehicleList] = useState([]);

    const [select, isSelect] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const roomref = useRef();
    const vehicleref = useRef();

    let [btnActive, setBtnActive] = useState('');
    let [btnActive2, setBtnActive2] = useState('');

    useEffect(() => {
        if (changeStoreSelect === 0 || changeStoreSelect === 1) {
            isSelect(changeStoreSelect);
        }
    }, [changeStoreSelect]);

    useEffect(() => {
        if (reqRoom?.lastId >= 0 && select === 0) {
            if (resRoomList?.length === 0) {
                setLoading(true);
                function fetch() {
                    dispatch(myReservationRoomList(reqRoom));
                    setLoading(false);
                }
                fetch();
            }
        }
    }, [reqRoom, select]);

    useEffect(() => {
        if (reqVehicle?.lastId >= 0 && select === 1) {
            if (resVehicleList?.length === 0) {
                setLoading(true);
                dispatch(myReservationVehicleList(reqVehicle));
                setLoading(false);
            }
        }
    }, [reqVehicle, select]);

    useEffect(() => {
        if (
            reservationStore?.myReservationRoomList?.data?.value &&
            reservationStore?.myReservationRoomList?.data?.value[reservationStore?.myReservationRoomList?.data?.value?.length - 1]
                ?.reservationResDTO?.id !== resRoomList[resRoomList?.length - 1]?.reservationResDTO?.id
        ) {
            setResRoomList([...resRoomList, ...reservationStore?.myReservationRoomList?.data?.value]);
            isStart(true);
        }
    }, [reservationStore?.myReservationRoomList?.data?.value]);

    useEffect(() => {
        if (resRoomList?.length > 0) {
            dispatch(ItemChangeSave(resRoomList[0]));
        }
    }, [resRoomList && !start]);

    useEffect(() => {
        if (
            reservationStore?.myReservationVehicleList?.data?.value &&
            reservationStore?.myReservationVehicleList?.data?.value[reservationStore?.myReservationVehicleList?.data?.value?.length - 1]
                ?.reservationId !== resVehicleList[resVehicleList?.length - 1]?.reservationId
        ) {
            setResVehicleList([...resVehicleList, ...reservationStore?.myReservationVehicleList?.data?.value]);
            isStart2(true);
        }
    }, [reservationStore?.myReservationVehicleList?.data?.value]);
    useEffect(() => {
        if (resVehicleList?.length > 0) {
            dispatch(ItemChangeSave(resVehicleList[0]));
        }
    }, [resVehicleList && !start2]);

    useEffect(() => {
        if (resRoomList[resRoomList.length - 1] && resRoomList?.length > 0) {
            setReqRoomLastId(resRoomList[resRoomList.length - 1].reservationResDTO.id);
        }
    }, [resRoomList]);
    useEffect(() => {
        if (resVehicleList[resVehicleList?.length - 1] && resVehicleList?.length > 0) {
            setReqVehicleLastId(resVehicleList[resVehicleList?.length - 1]?.reservationId);
        }
    }, [resVehicleList]);

    useEffect(() => {
        if (roomDeleteId >= 0) {
            const index = resRoomList?.findIndex((item) => item.reservationResDTO?.id === roomDeleteId);
            resRoomList.splice(index, 1);
            setResRoomList([...resRoomList]);
            dispatch(ItemChangeSave(resRoomList[index]));
        }
    }, [roomDeleteId]);

    useEffect(() => {
        if (vehicleDeleteId >= 0) {
            const index = resVehicleList?.findIndex((item) => item.reservationId === vehicleDeleteId);
            resVehicleList.splice(index, 1);
            setResVehicleList([...resVehicleList]);
            dispatch(ItemChangeSave(resVehicleList[index]));
        }
    }, [vehicleDeleteId]);

    function handleDetail1(item, idx) {
        setBtnActive(idx);
        setLoading(true);
        dispatch(ItemChangeSave(item));
        setLoading(false);
    }
    function handleDetail2(item, idx) {
        setBtnActive2(idx);
        setLoading(true);
        dispatch(ItemChangeSave(item));
        setLoading(false);
    }

    const container = useRef(null);

    const handleScroll = useCallback(async () => {
        // const { innerHeight } = window ;
        // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
        const innerHeight = document?.getElementById('MyReservatationList')?.getBoundingClientRect()?.width;

        // 브라우저 총 내용의 크기 (스크롤을 포함한다)
        const scrollHeight = container?.current?.scrollHeight;

        // 현재 스크롤바의 위치
        const scrollTop = container?.current?.scrollTop;

        // if (!flag) {
        //     document.getElementById('MyReservatationList').style.overflowY = 'scroll';
        // } else if (flag) {
        //     document.getElementById('MyReservatationList').style.overflowY = 'hidden';
        // }
        // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.
        if (Math.round(scrollTop + innerHeight) >= Math.round(scrollHeight * 0.75)) {
            if (select === 0 && reqRoomLastId && resRoomList.length !== total) {
                setReqRoom({
                    lastId: reqRoomLastId,
                    limit: 5
                });
                setLoading2(true);
                setFlag(true);
                function fetch() {
                    dispatch(myReservationRoomList(reqRoom));
                    setLoading2(false);
                    setFlag(false);
                }
                fetch();
            } else if (select === 1 && reqVehicleLastId) {
                setReqVehicle({
                    lastId: reqVehicleLastId,
                    limit: 5
                });
                setLoading2(true);
                setFlag(true);
                function fetch() {
                    dispatch(myReservationVehicleList(reqVehicle));
                    setLoading2(false);
                    setFlag(false);
                }
                fetch();
            }
        }
    }, [resRoomList, reqRoomLastId, reqRoom, resVehicleList, reqVehicleLastId, reqVehicle, select]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
        };
    }, [handleScroll]);

    return (
        <div className="MyReservatationList" id="MyReservatationList" ref={container}>
            {/* <div className="title">내 예약 현황 목록 / Total - {total}</div> */}

            {!loading ? (
                <>
                    {select === 0 && (
                        <>
                            {resRoomList?.length > 0 ? (
                                <>
                                    {resRoomList?.map((item, idx) => (
                                        <div
                                            key={item?.reservationId}
                                            ref={roomref}
                                            onClick={() => handleDetail1(item, idx)}
                                            className={idx == btnActive ? ' active2' : ''}
                                        >
                                            <MyReservationCard data={item} />
                                        </div>
                                    ))}
                                    {loading2 ? (
                                        <div className="absoluteLoading">
                                            <Loading text={'불러오는중 ...'} />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                    {select === 1 && (
                        <>
                            {resVehicleList?.length > 0 ? (
                                <>
                                    {resVehicleList?.map((item, idx) => {
                                        return (
                                            <div
                                                key={item?.reservationId}
                                                ref={vehicleref}
                                                onClick={() => handleDetail2(item, idx)}
                                                className={idx == btnActive2 ? ' active2' : ''}
                                            >
                                                <MyReservationCard data={item}></MyReservationCard>
                                            </div>
                                        );
                                    })}
                                    {loading2 ? (
                                        <>
                                            <div className="absoluteLoading">
                                                <Loading text={'불러오는중 ...'} />
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className="centerLoading">
                        <Loading text={'불러오는중 ...'} />
                    </div>
                </>
            )}
        </div>
    );
}
export default MyReservationList;

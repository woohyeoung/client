// Install
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// User
import {
    BackFrame,
    ModalSection,
    ModalTitle,
    ModalCloseButton,
    ModalContent,
    ModalFrameBody,
    ModalFrameTitle,
    ModalFrameContent,
    ModalCheckButton,
    CustomButton,
    TextTitle,
    TextContent,
    ContentFrame,
    SubContentFrame,
    ImgCard,
    InsideFrame,
    TextFrame,
    ModalTag,
    TextOutFrame
} from './ReservationModalStyle';
import { ImgCardList } from '../Table/SelectTableService';
import { selectCompleteRoomReservation, selectCompleteVehicleReservation } from '../../../store/actions/CalendarAction';
import { initSocketData } from 'store/actions/WebsocketAction';
import { ChangeTimerMessage } from 'store/actions/ChangeAction';

const ModalFrame = ({ children, visible, onClose }) => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (visible) {
            setIsOpen(true);
        } else {
            setTimeout(() => setIsOpen(false), 150);
        }
    }, [visible]);
    if (!isOpen) {
        return null;
    }

    function onDispatchTimer() {
        dispatch(ChangeTimerMessage());
    }
    return (
        <>
            <BackFrame
                visible={visible}
                onClick={() => {
                    onClose();
                    onDispatchTimer();
                }}
            />
            <ModalSection visible={visible}>
                <ModalTitle>
                    <ModalCloseButton
                        type={'button'}
                        onClick={() => {
                            onClose();
                            onDispatchTimer();
                        }}
                    >
                        X
                    </ModalCloseButton>
                </ModalTitle>
                <ModalContent>{children}</ModalContent>
                <ModalCheckButton>
                    <CustomButton
                        onClick={() => {
                            onClose();
                            onDispatchTimer();
                        }}
                    >
                        확인
                    </CustomButton>
                </ModalCheckButton>
            </ModalSection>
        </>
    );
};

export const ModalInsideText = (props) => {
    const dispatch = useDispatch();
    const [dataSet, setDataSet] = useState();
    const inputRoomStore = useSelector((state) => state.calendarReducer.completeRoomReservation);
    const inputVehicleStore = useSelector((state) => state.calendarReducer.completeVehicleReservation);

    useEffect(() => {
        if (props) {
            dispatch(props.type === 0 ? selectCompleteRoomReservation() : selectCompleteVehicleReservation());
        }
    }, [props]);
    useEffect(() => {
        if (props.type === 0) {
            if (inputRoomStore && inputRoomStore.data != null && inputRoomStore.data.value) {
                setDataSet(inputRoomStore.data.value[0]);
            }
        } else if (props.type === 1) {
            if (inputVehicleStore && inputVehicleStore.data != null && inputVehicleStore.data.value) {
                setDataSet(inputVehicleStore.data.value[0]);
            }
        }
    }, [inputVehicleStore, inputRoomStore, props, dataSet]);
    return (
        <ModalFrameBody>
            <ModalFrameContent>
                {dataSet !== undefined ? (
                    props.type === 0 ? (
                        <InsideFrame>
                            <ImgCard>
                                <div style={{ marginBottom: '20px' }}>
                                    {dataSet.reservationResDTO.room && dataSet.reservationResDTO.room.roomImgResDTOList.length ? (
                                        <ImgCardList
                                            data={dataSet.reservationResDTO.room.roomImgResDTOList}
                                            width={'400'}
                                            height={'auto'}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <InsideFrame>
                                    <TextOutFrame>
                                        <TextFrame>
                                            <TextContent props={'13'}>예약자 : {dataSet.reservationResDTO.emp.name}</TextContent>
                                            <TextContent props={'13'}>사번 : {dataSet.reservationResDTO.emp.empNo}</TextContent>
                                        </TextFrame>
                                        <TextTitle props={'13'}>제목 : {dataSet.reservationResDTO.title}</TextTitle>
                                        <TextTitle props={'13'}>내용 : {dataSet.reservationResDTO.reason}</TextTitle>
                                    </TextOutFrame>
                                </InsideFrame>
                            </ImgCard>
                            <SubContentFrame>
                                <ModalFrameTitle>예약 완료</ModalFrameTitle>
                                <TextContent props={'20'}>{dataSet.reservationResDTO.room.content}</TextContent>
                                <ContentFrame>
                                    <TextContent props={'19'}>{dataSet.reservationResDTO.room.categoryName}</TextContent>
                                    <TextOutFrame>
                                        <TextContent props={'18'}>방번호 : {dataSet.reservationResDTO.room.roomNo}</TextContent>
                                        <TextContent props={'18'}>인원수 : {dataSet.reservationResDTO.room.capacity}</TextContent>
                                    </TextOutFrame>
                                </ContentFrame>
                                <ContentFrame>
                                    {dataSet.reservationResDTO.room.roomObjectResDTOList ? (
                                        dataSet.reservationResDTO.room.roomObjectResDTOList.map((v, i) => {
                                            return (
                                                <div key={i}>{v.name !== ' ' && v.name !== '' ? <ModalTag>{v.name}</ModalTag> : <></>}</div>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </ContentFrame>
                                <TextContent props={'16'}>
                                    예약시간 : {convertDateTime(dataSet.reservationResDTO.startedAt)} ~{' '}
                                    {convertDateTime(dataSet.reservationResDTO.endedAt)}
                                </TextContent>
                                <div style={{ marginTop: '10px' }}>등록일 : {dataSet.reservationResDTO.createdAt}</div>
                            </SubContentFrame>
                        </InsideFrame>
                    ) : (
                        <InsideFrame>
                            <ImgCard>
                                <div style={{ marginBottom: '20px' }}>
                                    {dataSet && dataSet.imgList.length ? (
                                        <ImgCardList data={dataSet.imgList} width={'400'} height={'auto'} />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <InsideFrame>
                                    <TextOutFrame>
                                        <TextFrame>
                                            <TextContent props={'13'}>예약자 : {dataSet.ename}</TextContent>
                                            <TextContent props={'13'}>사번 : {dataSet.empNo}</TextContent>
                                        </TextFrame>
                                        <TextTitle props={'13'}>제목 : {dataSet.title}</TextTitle>
                                        <TextTitle props={'13'}>내용 : {dataSet.reason}</TextTitle>
                                    </TextOutFrame>
                                </InsideFrame>
                            </ImgCard>
                            <SubContentFrame>
                                <ModalFrameTitle>예약 완료</ModalFrameTitle>
                                <TextContent props={'20'}>{dataSet.vname}</TextContent>
                                <ContentFrame>
                                    <TextContent props={'19'}>{dataSet.model}</TextContent>
                                    <TextOutFrame>
                                        <TextContent props={'15'}>차량번호 : {dataSet.vnumber}</TextContent>
                                        <TextContent props={'15'}>탑승인원 : {dataSet.capacity}</TextContent>
                                        <TextContent props={'15'}>차량색상 : {dataSet.color}</TextContent>
                                    </TextOutFrame>
                                </ContentFrame>
                                <TextContent props={'16'}>
                                    예약시간 : {convertDateTime(dataSet.startedAt)} ~ {convertDateTime(dataSet.endedAt)}
                                </TextContent>
                                <div style={{ marginTop: '10px' }}>등록일 : {dataSet.reservationCreatedAt}</div>
                            </SubContentFrame>
                        </InsideFrame>
                    )
                ) : (
                    <></>
                )}
            </ModalFrameContent>
        </ModalFrameBody>
    );
};

const ModalPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const isCloseHandler = () => {
        setIsOpen(false);
        navigate('/main/my/reservation/status');
        dispatch(initSocketData());
    };
    useEffect(() => {
        setIsOpen(props.open);
    }, [props]);
    return (
        <div>
            <ModalFrame visible={isOpen} onClose={isCloseHandler}>
                <ModalInsideText type={props.type} />
            </ModalFrame>
        </div>
    );
};

export const ReservationModal = (props) => {
    return (
        <>
            <ModalPage type={props.type} open={props.open} />
        </>
    );
};

const convertDateTime = (props) => {
    return props.replace('T', ' ');
};

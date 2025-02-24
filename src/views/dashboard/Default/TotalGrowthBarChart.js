import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/actions/DashboardConstant';

// chart data
import { roomCnt, chartData, chartData2, chartData3 } from './chart-data/total-growth-bar-chart';
import { getRoomChart } from 'components/ApiModules/ApiHandler';

import ReservationChoice from 'components/reservation/ReservationChoice';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
    OnedayfindRoomReservationCount,
    ThreedayfindRoomReservationCount,
    SevendayfindRoomReservationCount,
    OnedayfindRoomReservationTime,
    ThreedayfindRoomReservationTime,
    SevendayfindRoomReservationTime,
    OnedayfindRoomMeetTime,
    ThreedayfindRoomMeetTime,
    SevendayfindRoomMeetTime,
    OnedayfindVehicleReservationCount,
    ThreedayfindVehicleReservationCount,
    SevendayfindVehicleReservationCount,
    OnedayfindVehicleReservationTime,
    ThreedayfindVehicleReservationTime,
    SevendayfindVehicleReservationTime,
    OnedayfindVehicleStartTime,
    ThreedayfindVehicleStartTime,
    SevendayfindVehicleStartTime
} from 'store/actions/DashboardActions';
import { Selected2ChangeSave } from 'store/actions/ChangeAction';
import { useCallback } from 'react';

// 메뉴 바
const status = [
    {
        value: '1',
        label: '예약한 개수'
    },
    {
        value: '2',
        label: '사람들이 예약하는 시간대'
    },
    {
        value: '3',
        label: '사람들이 이용을 시작하는 시간대'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
    const [value, setValue] = useState('1');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const changeStoreSelect = useSelector((state) => state.changeReducer.selected);
    const changeStoreSelect2 = useSelector((state) => state.changeReducer.selected2);

    const oneDayRoomReservaionCount = useSelector((state) => state.dashboardReducer?.oneDayRoomReservationCount);
    const threeDayRoomReservationCount = useSelector((state) => state.dashboardReducer?.threeDayRoomReservationCount);
    const sevenDayRoomReservationCount = useSelector((state) => state.dashboardReducer?.sevenDayRoomReservationCount);

    const oneDayRoomReservaionTime = useSelector((state) => state.dashboardReducer.oneDayRoomReservationTime);
    const threeDayRoomReservationTime = useSelector((state) => state.dashboardReducer.threeDayRoomReservationTime);
    const sevenDayRoomReservationTime = useSelector((state) => state.dashboardReducer.sevenDayRoomReservationTime);

    const oneDayRoomMeetTime = useSelector((state) => state.dashboardReducer.oneDayRoomMeetTime);
    const threeDayRoomMeetTime = useSelector((state) => state.dashboardReducer.threeDayRoomMeetTime);
    const sevenDayRoomMeetTime = useSelector((state) => state.dashboardReducer.sevenDayRoomMeetTime);

    const oneDayVehicleReservaionCount = useSelector((state) => state.dashboardReducer.oneDayVehicleReservationCount);
    const threeDayVehicleReservationCount = useSelector((state) => state.dashboardReducer.threeDayVehicleReservationCount);
    const sevenDayVehicleReservationCount = useSelector((state) => state.dashboardReducer.sevenDayVehicleReservationCount);

    const oneDayVehicleReservaionTime = useSelector((state) => state.dashboardReducer.oneDayVehicleReservationTime);
    const threeDayVehicleReservationTime = useSelector((state) => state.dashboardReducer.threeDayVehicleReservationTime);
    const sevenDayVehicleReservationTime = useSelector((state) => state.dashboardReducer.sevenDayVehicleReservationTime);

    const oneDayVehicleStartTime = useSelector((state) => state.dashboardReducer.oneDayVehicleMeetTime);
    const threeDayVehicleStartTime = useSelector((state) => state.dashboardReducer.threeDayVehicleMeetTime);
    const sevenDayVehicleStartTime = useSelector((state) => state.dashboardReducer.sevenDayVehicleMeetTime);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    const dispatch = useDispatch();

    const [onedayList1, setOneDayList1] = useState([]);
    const [threedayList1, setThreeDayList1] = useState([]);
    const [sevendayList1, setSevenDayList1] = useState([]);

    const [onedayList2, setOneDayList2] = useState([]);
    const [threedayList2, setThreeDayList2] = useState([]);
    const [sevendayList2, setSevenDayList2] = useState([]);

    const [onedayList3, setOneDayList3] = useState([]);
    const [threedayList3, setThreeDayList3] = useState([]);
    const [sevendayList3, setSevenDayList3] = useState([]);

    const [onedayList4, setOneDayList4] = useState([]);
    const [threedayList4, setThreeDayList4] = useState([]);
    const [sevendayList4, setSevenDayList4] = useState([]);

    const [onedayList5, setOneDayList5] = useState([]);
    const [threedayList5, setThreeDayList5] = useState([]);
    const [sevendayList5, setSevenDayList5] = useState([]);

    const [onedayList6, setOneDayList6] = useState([]);
    const [threedayList6, setThreeDayList6] = useState([]);
    const [sevendayList6, setSevenDayList6] = useState([]);

    const [oneData, setOneData] = useState([]);
    const [threeData, setThreeData] = useState([]);
    const [sevenData, setSevenData] = useState([]);

    const [select, isSelect] = useState();
    const [select2, isSelect2] = useState();

    const [graphType, setGraphType] = useState('bar');

    const [ArrX, setArrX] = useState([]);

    const [chartDataResult, setchartDataResult] = useState({
        height: chartData.height,
        type: chartData.type,
        options: chartData.options,
        series: chartData.series
    });
    const [chartDataResult2, setchartDataResult2] = useState({
        height: chartData.height,
        type: chartData.type,
        options: chartData.options,
        series: chartData.series
    });

    // 첫 axios 통신을 통해 18개의 api를 부른다. redux-thunk를 통해서 redux store에 들어가게 된다.
    // 1, 3, 7일 통계 회의실 3개 / 차량 3개 => 총 18개
    useEffect(() => {
        dispatch(OnedayfindRoomReservationCount(1));
        dispatch(ThreedayfindRoomReservationCount(3));
        dispatch(SevendayfindRoomReservationCount(7));

        dispatch(OnedayfindRoomReservationTime(1));
        dispatch(ThreedayfindRoomReservationTime(3));
        dispatch(SevendayfindRoomReservationTime(7));

        dispatch(OnedayfindRoomMeetTime(1));
        dispatch(ThreedayfindRoomMeetTime(3));
        dispatch(SevendayfindRoomMeetTime(7));

        dispatch(OnedayfindVehicleReservationCount(1));
        dispatch(ThreedayfindVehicleReservationCount(3));
        dispatch(SevendayfindVehicleReservationCount(7));

        dispatch(OnedayfindVehicleReservationTime(1));
        dispatch(ThreedayfindVehicleReservationTime(3));
        dispatch(SevendayfindVehicleReservationTime(7));

        dispatch(OnedayfindVehicleStartTime(1));
        dispatch(ThreedayfindVehicleStartTime(3));
        dispatch(SevendayfindVehicleStartTime(7));
    }, []);

    // 차량 /  회의실 선택 => 회의실 0, 차량 1
    useEffect(() => {
        if (changeStoreSelect == 0 || changeStoreSelect == 1) {
            isSelect(changeStoreSelect);
        }
    }, [changeStoreSelect]);

    // 통계 3개 선택  => 1,2,3
    useEffect(() => {
        if (changeStoreSelect2 >= 1 && changeStoreSelect2 <= 3) {
            isSelect2(changeStoreSelect2);
        }
    }, [changeStoreSelect2]);

    //sort
    function sort1(a, b) {
        if (a > b) {
            return 1;
        }
        if (a == b) {
            return 0;
        }
        if (a < b) {
            return -1;
        }
    }
    //---------------------------------------------------------------------------------------------
    //1,3,7 일간 많이 예약된 회의실

    useEffect(() => {
        if (oneDayRoomReservaionCount?.data?.value) {
            setOneDayList1(oneDayRoomReservaionCount.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
        if (threeDayRoomReservationCount?.data?.value) {
            setThreeDayList1(threeDayRoomReservationCount.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
        if (sevenDayRoomReservationCount?.data?.value) {
            setSevenDayList1(sevenDayRoomReservationCount.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
    }, [oneDayRoomReservaionCount, threeDayRoomReservationCount, sevenDayRoomReservationCount]);
    //1,3,7 일간 많이 회의실 예약한 시간대
    useEffect(() => {
        if (oneDayRoomReservaionTime?.data?.value) {
            setOneDayList2(oneDayRoomReservaionTime.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
        if (threeDayRoomReservationTime?.data?.value) {
            setThreeDayList2(threeDayRoomReservationTime.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
        if (sevenDayRoomReservationTime?.data?.value) {
            setSevenDayList2(sevenDayRoomReservationTime.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
    }, [oneDayRoomReservaionTime, threeDayRoomReservationTime, sevenDayRoomReservationTime]);

    //1,3,7 일간 많이 회의실을 이용 시작 시간대
    useEffect(() => {
        if (oneDayRoomMeetTime?.data?.value) {
            setOneDayList3(oneDayRoomMeetTime.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
        if (threeDayRoomMeetTime?.data?.value) {
            setThreeDayList3(threeDayRoomMeetTime.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
        if (sevenDayRoomMeetTime?.data?.value) {
            setSevenDayList3(sevenDayRoomMeetTime.data.value.sort((a, b) => sort1(a.roomId, b.roomId)));
        }
    }, [oneDayRoomMeetTime, threeDayRoomMeetTime, sevenDayRoomMeetTime]);

    //1,3,7 일간 많이 예약된 차량
    useEffect(() => {
        if (oneDayVehicleReservaionCount?.data?.value) {
            setOneDayList4(oneDayVehicleReservaionCount.data.value.sort((a, b) => sort1(a.vehicle.id, b.vehicle.id)));
        }
        if (threeDayVehicleReservationCount?.data?.value) {
            setThreeDayList4(threeDayVehicleReservationCount.data.value.sort((a, b) => sort1(a.vehicle.id, b.vehicle.id)));
        }
        if (sevenDayVehicleReservationCount?.data?.value) {
            setSevenDayList4(sevenDayVehicleReservationCount.data.value.sort((a, b) => sort1(a.vehicle.id, b.vehicle.id)));
        }
    }, [oneDayVehicleReservaionCount, threeDayVehicleReservationCount, sevenDayVehicleReservationCount]);

    //1,3,7 일간 많이 예약한 차량 시간대
    useEffect(() => {
        if (oneDayVehicleReservaionTime?.data?.value) {
            setOneDayList5(oneDayVehicleReservaionTime.data.value.sort((a, b) => sort1(a.id, b.id)));
        }
        if (threeDayVehicleReservationTime?.data?.value) {
            setThreeDayList5(threeDayVehicleReservationTime.data.value.sort((a, b) => sort1(a.id, b.id)));
        }
        if (sevenDayVehicleReservationTime?.data?.value) {
            setSevenDayList5(sevenDayVehicleReservationTime.data.value.sort((a, b) => sort1(a.id, b.id)));
        }
    }, [oneDayVehicleReservaionTime, threeDayVehicleReservationTime, sevenDayVehicleReservationTime]);

    //1,3,7 일간 많이 차량을 이용 시작 시간대
    useEffect(() => {
        if (oneDayVehicleStartTime?.data?.value) {
            setOneDayList6(oneDayVehicleStartTime.data.value.sort((a, b) => sort1(a.reservationId, b.reservationId)));
        }
        if (threeDayVehicleStartTime?.data?.value) {
            setThreeDayList6(threeDayVehicleStartTime.data.value.sort((a, b) => sort1(a.reservationId, b.reservationId)));
        }
        if (sevenDayVehicleStartTime?.data?.value) {
            setSevenDayList6(sevenDayVehicleStartTime.data.value.sort((a, b) => sort1(a.reservationId, b.reservationId)));
        }
    }, [oneDayVehicleStartTime, threeDayVehicleStartTime, sevenDayVehicleStartTime]);

    //---------------------------------------------------------------------------------------------

    useEffect(() => {
        // 첫번째 회의실 리스트 렌더링
        if (select == 0 && select2 == 1 && onedayList1.length > 0 && threedayList1.length > 0 && sevendayList1.length > 0) {
            async function fetch() {
                const List = await categoriesName(onedayList1, threedayList1, sevendayList1);
                setArrX(List);
                await dataCount(onedayList1, threedayList1, sevendayList1, List);
            }
            fetch();
        }
        if (select == 0 && select2 == 2) {
            async function fetch() {
                const List = await categoriesTime(onedayList2, threedayList2, sevendayList2);
                setArrX(List);
                await dataTimeCount(onedayList2, threedayList2, sevendayList2, List);
            }
            fetch();
        }
        if (select == 0 && select2 == 3) {
            async function fetch() {
                const List = await categoriesTime(onedayList3, threedayList3, sevendayList3);
                setArrX(List);
                await dataTimeCount(onedayList3, threedayList3, sevendayList3, List);
            }
            fetch();
        }

        if (select == 1 && select2 == 1) {
            async function fetch() {
                const List = await categoriesName(onedayList4, threedayList4, sevendayList4);
                setArrX(List);
                await dataCount(onedayList4, threedayList4, sevendayList4, List);
            }
            fetch();
        }
        if (select == 1 && select2 == 2) {
            async function fetch() {
                const List = await categoriesTime(onedayList5, threedayList5, sevendayList5);
                setArrX(List);
                await dataTimeCount(onedayList5, threedayList5, sevendayList5, List);
            }
            fetch();
        }
        if (select == 1 && select2 == 3) {
            async function fetch() {
                const List = await categoriesTime(onedayList6, threedayList6, sevendayList6);
                setArrX(List);
                await dataTimeCount(onedayList6, threedayList6, sevendayList6, List);
            }
            fetch();
        }
    }, [
        select,
        select2,
        onedayList1,
        threedayList1,
        sevendayList1,
        onedayList2,
        threedayList2,
        sevendayList2,
        onedayList3,
        threedayList3,
        sevendayList3,
        onedayList4,
        threedayList4,
        sevendayList4,
        onedayList5,
        threedayList5,
        sevendayList5,
        onedayList6,
        threedayList6,
        sevendayList6
    ]);

    // x축 카테고리 설정 - 회의실/차량 이름
    const categoriesName = useCallback(async (onedayList11, threedayList11, sevendayList11) => {
        let copyList = [];

        onedayList11.map((item) => {
            copyList.push(item?.roomNo || item?.vehicle?.name || item?.vname);
        });
        threedayList11.map((item) => {
            copyList.push(item?.roomNo || item?.vehicle?.name || item?.vname);
        });
        sevendayList11.map((item) => {
            copyList.push(item?.roomNo || item?.vehicle?.name || item?.vname);
        });

        copyList = copyList.filter((item, i) => copyList.indexOf(item) == i);

        copyList.sort((a, b) => sort1(a, b));
        return copyList;
        // setArrX(copyList);
    }, []);
    // x축 카테고리 설정 - 시간
    const categoriesTime = useCallback(async (onedayList11, threedayList11, sevendayList11) => {
        let copyList = [];

        onedayList11.map((item) => {
            copyList.push(item?.hour || item?.htime);
        });
        threedayList11.map((item) => {
            copyList.push(item?.hour || item?.htime);
        });
        sevendayList11.map((item) => {
            copyList.push(item?.hour || item?.htime);
        });

        copyList = copyList.filter((item, i) => copyList.indexOf(item) == i);

        copyList.sort((a, b) => sort1(a, b));
        return copyList;
        // setArrX(copyList);
    }, []);

    // y축 데이터 - 회의실/차량 별 개수
    const dataCount = useCallback(async (onedayList11, threedayList11, sevendayList11, List) => {
        let oneList = [...List];
        oneList.fill(0);
        let threeList = [...List];
        threeList.fill(0);
        let sevenList = [...List];
        sevenList.fill(0);

        onedayList11.map((item) => {
            let key = List.findIndex((i) => i == (item?.roomNo || item?.vehicle?.name));

            if (key != -1) {
                // 원래 있던 갯수
                let beforeCount = oneList[key];
                // 이번 개수
                let Count = item?.count || item?.vcount;
                oneList.splice(key, 1, beforeCount + Count);
            }
        });
        threedayList11.map((item) => {
            let key = List.findIndex((i) => i == (item?.roomNo || item?.vehicle?.name));

            if (key != -1) {
                // 원래 있던 갯수
                let beforeCount = threeList[key];
                // 이번 개수
                let Count = item?.count || item?.vcount;
                threeList.splice(key, 1, beforeCount + Count);
            }
        });
        sevendayList11.map((item) => {
            let key = List.findIndex((i) => i == (item?.roomNo || item?.vehicle?.name));
            if (key != -1) {
                // 원래 있던 갯수
                let beforeCount = sevenList[key];
                // 이번 개수
                let Count = item?.count || item?.vcount;
                sevenList.splice(key, 1, beforeCount + Count);
            }
        });

        setOneData(oneList);
        setThreeData(threeList);
        setSevenData(sevenList);
    }, []);

    // y축  데이터 - 시간 별
    const dataTimeCount = useCallback(async (onedayList11, threedayList11, sevendayList11, List) => {
        let oneList = [...List];
        oneList.fill(0);
        let threeList = [...List];
        threeList.fill(0);
        let sevenList = [...List];
        sevenList.fill(0);
        let tempX = [...List];

        for (let i = 0; i < onedayList11.length; i++) {
            let item = onedayList11[i]?.hour || onedayList11[i]?.htime;

            // 몇시인지 인덱스를 찾음
            let key = tempX.findIndex((i) => i == item);
            if (key != -1) {
                // 원래 있던 갯수
                let beforeCount = oneList[key];
                // 이번 개수
                let Count = onedayList11[i]?.count || onedayList11[i]?.hcount;
                oneList.splice(key, 1, beforeCount + Count);
            }
        }
        for (let i = 0; i < threedayList11.length; i++) {
            let item = threedayList11[i]?.hour || threedayList11[i]?.htime;
            // 몇시인지 인덱스를 찾음
            let key = tempX.findIndex((i) => i == item);
            if (key != -1) {
                // 원래 있던 갯수
                let beforeCount = threeList[key];
                // 이번 개수
                let Count = threedayList11[i]?.count || threedayList11[i]?.hcount;
                threeList.splice(key, 1, beforeCount + Count);
            }
        }
        for (let i = 0; i < sevendayList11.length; i++) {
            let item = sevendayList11[i]?.hour || sevendayList11[i]?.htime;
            // 몇시인지 인덱스를 찾음
            let key = tempX.findIndex((i) => i == item);
            if (key != -1) {
                // 원래 있던 갯수
                let beforeCount = sevenList[key];
                // 이번 개수
                let Count = sevendayList11[i]?.count || sevendayList11[i]?.hcount;
                sevenList.splice(key, 1, beforeCount + Count);
            }
        }

        setOneData(oneList);
        setThreeData(threeList);
        setSevenData(sevenList);
    }, []);

    // x축 카테고리와 y축 데이터를 넣어서 렌더링
    useEffect(() => {
        if (ArrX.length > 0 && oneData.length > 0 && threeData.length > 0 && sevenData.length > 0) {
            function fetch() {
                setchartDataResult({
                    ...chartDataResult,
                    options: {
                        ...chartDataResult.options,
                        xaxis: {
                            type: 'category',
                            categories: ArrX
                        }
                    },
                    series: [
                        {
                            name: '1일',
                            data: oneData
                        },
                        {
                            name: '3일',
                            data: threeData
                        },
                        {
                            name: '7일',
                            data: sevenData
                        }
                    ]
                });
            }

            fetch();
        }
    }, [ArrX, oneData, threeData, sevenData]);

    const handleChange = (event) => {
        setGraphType(event.target.value);
    };
    useEffect(() => {
        if (graphType == 'bar') {
            setchartDataResult({
                height: 450,
                type: 'bar',
                options: {
                    ...chartData.options,
                    xaxis: {
                        type: 'category',
                        categories: ArrX
                    }
                },
                series: [
                    {
                        name: '1일',
                        data: oneData
                    },
                    {
                        name: '3일',
                        data: threeData
                    },
                    {
                        name: '7일',
                        data: sevenData
                    }
                ]
            });
        } else if (graphType == 'heatmap') {
            // setchartDataRoomCount({ ...chartDataRoomCount });
            if (select == 0) {
                setchartDataResult({
                    type: 'heatmap',
                    options: {
                        ...chartData2.options,
                        xaxis: {
                            type: 'category',
                            categories: ArrX
                        },
                        plotOptions: {
                            heatmap: {
                                ...chartData2.options.plotOptions.heatmap,
                                colorScale: {
                                    ranges: [
                                        {
                                            from: 0,
                                            to: 3,
                                            name: '0~3',
                                            color: '#00A100'
                                        },
                                        {
                                            from: 4,
                                            to: 7,
                                            name: '4~7',
                                            color: '#128FD9'
                                        },
                                        {
                                            from: 8,
                                            to: 15,
                                            name: '8~15',
                                            color: '#FFB200'
                                        },
                                        {
                                            from: 15,
                                            to: 50,
                                            name: '15~50',
                                            color: '#FF0000'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: '1일',
                            data: oneData
                        },
                        {
                            name: '3일',
                            data: threeData
                        },
                        {
                            name: '7일',
                            data: sevenData
                        }
                    ]
                });
            } else if (select == 1) {
                setchartDataResult({
                    type: 'heatmap',
                    options: {
                        ...chartData2.options,
                        xaxis: {
                            type: 'category',
                            categories: ArrX
                        },
                        plotOptions: {
                            heatmap: {
                                ...chartData2.options.plotOptions.heatmap,
                                colorScale: {
                                    ranges: [
                                        {
                                            from: 0,
                                            to: 3,
                                            name: '0~3',
                                            color: '#00A100'
                                        },
                                        {
                                            from: 4,
                                            to: 7,
                                            name: '4~7',
                                            color: '#128FD9'
                                        },
                                        {
                                            from: 8,
                                            to: 15,
                                            name: '8~15',
                                            color: '#FFB200'
                                        },
                                        {
                                            from: 15,
                                            to: 50,
                                            name: '15~50',
                                            color: '#FF0000'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: '1일',
                            data: oneData
                        },
                        {
                            name: '3일',
                            data: threeData
                        },
                        {
                            name: '7일',
                            data: sevenData
                        }
                    ]
                });
            }
        }
    }, [graphType]);

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: '#000000'
                }
            }
        };
        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [
        navType,
        primary200,
        primaryDark,
        secondaryMain,
        secondaryLight,
        primary,
        darkLight,
        grey200,
        isLoading,
        grey500,
        value,
        graphType
    ]);

    const handleSelected2 = (option) => {
        dispatch(Selected2ChangeSave(option));
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={12} md={4}>
                                    <Grid
                                        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start' }}
                                        container
                                        direction="column"
                                        spacing={1}
                                    >
                                        <Grid item rowSpacing={2}>
                                            <Grid item style={{ marginBottom: '10%', display: 'flex' }}>
                                                <FormControl fullWidth variant="standard" sx={{ m: 1.5, minWidth: 120 }}>
                                                    <TextField
                                                        id="standard-basic"
                                                        variant="standard"
                                                        select
                                                        value={value}
                                                        onChange={(e) => setValue(e.target.value)}
                                                        label="통계 조건"
                                                    >
                                                        {status.map((option) => (
                                                            <MenuItem
                                                                sx={{ fontSize: '1em' }}
                                                                onClick={() => {
                                                                    handleSelected2(option);
                                                                }}
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {!select ? <>회의실을 </> : <>차량을 </>}
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </FormControl>
                                                <Box sx={{ minWidth: 60, width: 100 }}>
                                                    <FormControl fullWidth variant="standard" sx={{ m: 1.5, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-label">그래프</InputLabel>
                                                        {/* <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={graphType}
                                                            label="그래프"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={'bar'}>bar</MenuItem>
                                                            <MenuItem value={'heatmap'}>heatmap</MenuItem>
                                                        </Select> */}
                                                        <Select
                                                            id="standard-basic"
                                                            variant="standard"
                                                            select
                                                            value={graphType}
                                                            label="그래프"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={'bar'}>bar</MenuItem>
                                                            <MenuItem value={'heatmap'}>heatmap</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>

                                            <Grid item></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {!select ? <>회의실 통계</> : <>차량 통계</>}
                                    </h1>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                                        <ReservationChoice />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartDataResult} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;

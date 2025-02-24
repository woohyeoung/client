import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useCallback, useState, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getDepartment, getPosition, getPositionName, getTeam } from 'components/ApiModules/ApiHandler';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { dividerClasses } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePicker from 'react-datepicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';

const RoomFilter = (props) => {
    const [nowPage, setNowPage] = useState(1);

    const [dept, setDept] = useState([]);
    const [deptFilter, setDeptFilter] = useState(null);
    const [team, setTeam] = useState([]);
    const [teamFilter, setTeamFilter] = useState(null);
    const [position, setPosition] = useState([]);
    const [positionFilter, setPositionFilter] = useState(null);
    const [name, setName] = useState(null);
    const [empNo, setEmpNo] = useState(null);
    const [startedAt, setStartedAt] = useState(null);
    const [endedAt, setEndedAt] = useState(null);

    //시작 및 끝
    const startChange = (newValue) => {
        if (newValue == '') {
            setStartedAt(null);
        } else {
            setStartedAt(moment(newValue).format('YYYY-MM-DD') + ' 00:00:00');
        }
    };
    const endChange = (newValue) => {
        if (newValue == '') {
            setEndedAt(null);
        } else {
            setEndedAt(moment(newValue).format('YYYY-MM-DD') + ' 00:00:00');
        }
    };
    //사원번호 입력
    function changeEmpNo(e) {
        if (e.target.value == '') {
            setEmpNo(null);
        } else {
            setEmpNo(e.target.value);
        }
    }
    //이름 입력
    function changeName(e) {
        setName(e.target.value);
        if (e.target.value == '') {
            setName(null);
        } else {
            setName(e.target.value);
        }
    }
    //position 선택하는 부분
    function selectPosition(e) {
        if (e.target.value == '') {
            setPositionFilter(null);
        } else {
            setPositionFilter(e.target.value);
        }
    }
    //team 선택하는 부분
    function selectTeam(e) {
        console.log(deptFilter);
        console.log(e.target.value);
        if (e.target.value == '') {
            setTeamFilter(null);
        } else {
            setTeamFilter(e.target.value);
        }
    }

    //dept 선택하는 부분
    async function selectDept(e) {
        console.log(e.target.value);
        setDeptFilter(e.target.value);
        if (e.target.value == '') {
            setDeptFilter(null);
        } else {
            setDeptFilter(e.target.value);
        }
        if (e.target.value) {
            let tmpTeam = await getTeam(e.target.value);
            setTeam(tmpTeam);
        }
    }

    async function getDeptName() {
        let depart = await getDepartment();
        console.log(depart);
        setDept(depart);
    }
    async function getPositionName() {
        let pos = await getPosition();
        console.log(pos);
        setPosition(pos);
    }

    useEffect(() => {
        getDeptName();
        getPositionName();
    }, []);

    useEffect(() => {
        props.res(1, deptFilter, teamFilter, positionFilter, name, empNo, startedAt, endedAt);
        console.log(deptFilter, teamFilter, positionFilter, name, empNo, startedAt, endedAt);
    }, [deptFilter, teamFilter, positionFilter, name, empNo, startedAt, endedAt]);

    const selectPage = (item) => {
        props.res(item.page, deptFilter, teamFilter, positionFilter, name, empNo, startedAt, endedAt);
    };

    const theme = createTheme({});

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Stack spacing={2}>
                    <Pagination
                        count={props.totalPage}
                        renderItem={(item) => (
                            <div onClick={() => selectPage(item)} onKeyPress={() => console.log(item)}>
                                <PaginationItem components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
                            </div>
                        )}
                    />
                </Stack>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">dept</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={deptFilter}
                        onChange={selectDept}
                        label="dept"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {dept.map((dept) => (
                            // <div onClick={() => selectDept2(dept.id)} onKeyPress={() => selectDept2(dept.id)}>
                            <MenuItem key={dept.id} value={dept.id}>
                                {dept.name}
                            </MenuItem>
                            // </div>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">team</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={teamFilter}
                        onChange={selectTeam}
                        label="team"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {team.map((team) => (
                            <MenuItem key={team.id} value={team.id}>
                                {team.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">position</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={positionFilter}
                        onChange={selectPosition}
                        label="position"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {position.map((position) => (
                            <MenuItem key={position.id} value={position.id}>
                                {position.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField id="standard-basic" label="empNo" variant="standard" onChange={changeEmpNo} />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <TextField id="standard-basic" label="name" variant="standard" onChange={changeName} />
                </FormControl>
                <FormControl style={{ width: '150px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="startedAt"
                                inputFormat="MM/dd/yyyy"
                                value={startedAt}
                                onChange={startChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
                <FormControl style={{ width: '150px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="endedAt"
                                inputFormat="MM/dd/yyyy"
                                value={endedAt}
                                onChange={endChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
            </ThemeProvider>
        </div>
    );
};
export default RoomFilter;

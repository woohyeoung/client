import SelectTableFrame from '../../../../../components/SelectTableProduct/Table';
import TimeTableFrame from '../../../../../components/DateTimeTable/Time';
import DateTableFrame from 'components/DateTimeTable/Date';
import BoardTableFrame from 'components/SelectTableProduct/Board';
import WebsocketController from 'components/Websocket';
import { ComponentFrame, ContentFrame, FullWidthFrame } from './ReservationPageStyle';
import WebsocketMessage from 'components/Websocket/WebsocketMessage';

export const ReservationPage = () => {
    return (
        <FullWidthFrame>
            <WebsocketMessage />
            <ComponentFrame>
                <ContentFrame>
                    <TimeTableFrame />
                </ContentFrame>
                <ContentFrame>
                    <DateTableFrame />
                </ContentFrame>
            </ComponentFrame>
            <ComponentFrame>
                <ContentFrame>
                    <SelectTableFrame />
                </ContentFrame>
                <ContentFrame>
                    <BoardTableFrame />
                </ContentFrame>
                <ContentFrame>
                    <WebsocketController />
                </ContentFrame>
            </ComponentFrame>
        </FullWidthFrame>
    );
};

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    0% {
        height: 0;
        opacity: 0;
    }
    60% {
        opacity: 0;
    }
    100% {
        height: 520px;
        opacity: 1;
    }
`;

export const HalfWidthFrame = styled.div`
    animation: ${fadeIn} 1.25s ease-out;
    max-width: 800px;
    height: 520px;
    background-color: #fff;
    text-align: center;
    margin: 15px auto;
    border-radius: 30px;
    display: flex;
    align-items: center;
`;

export const ComponentFrame = styled.div`
    width: 97%;
    height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    margin: auto;
    padding-top: 1%;
    padding-bottom: 3%;
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #673ab7;
        opacity: 0.6;
        border-radius: 10px;
        box-shadow: inset 0px 0px 10px white;
    }
    &::-webkit-scrollbar-track {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px gray;
    }
`;

export const CardFrame = styled.div`
    margin: 5px 0;
    padding: 0;
    width: 530px;
    height: 160px;
    color: #673ab7;
    box-shadow: inset 0 0 5px #b39ddb;
    border-radius: 20px;
    cursor: pointer;
    background-color: ${(props) => (props.props === 1 ? '#b39ddb' : '#fff')};
`;

export const ListFrame = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const ItemFrame = styled.li`
    margin: 0;
    padding: 0;
    color: #673ab7;
    font-size: medium;
    text-align: center;
`;

export const ImgCard = styled.div`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    border-radius: 20px;
    cursor: pointer;
`;

export const InsideFrame = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 0;
    padding: 0 5px 0 0;
`;
export const TextFrame = styled.div`
    height: 100%;
    width: 250px;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

export const TextTitle = styled.div`
    font-weight: bold;
    font-size: ${(props) => props.props}px;
`;

export const TextContent = styled.div`
    font-size: ${(props) => props.props}px;
`;

export const ContentFrame = styled.div`
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
`;

export const SubContentFrame = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 155px;
`;

export const CustomButton = styled.button`
    color: #fff;
    margin-right: 3px;
    margin-top: 80px;
    background-color: #673ab7;
    opacity: 0.7;
    border: none;
    border-radius: 20px;
    width: 80px;
    height: 30px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        box-shadow: inset 0 0 5px white;
        opacity: 1;
        width: 85px;
        height: 30px;
        transition: all 0.3s;
    }
`;

export const TextSubTitle = styled.div`
    font-weight: bold;
    font-size: ${(props) => props.props}px;
    color: #673ab7;
    margin-top: 10%;
`;

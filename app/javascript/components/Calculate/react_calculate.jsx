import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ReactCalculate = () => {
    const [incomeData, setIncomeData] = useState(0);
    const [saveIncomeData, setSaveIncomeData] = useState(() => {
        const savedIncome = localStorage.getItem('saveIncomeData');
        return savedIncome ? parseFloat(savedIncome) : 0;
    });
    const [spendingData, setSpendingData] = useState(0);
    const [calculateData, setCalculateData] = useState([]);
    const [formSpendingData, setFormSpendingData] = useState(false);
    const [formDataInput, setFormDataInput] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        item: "",
        amount: "",
        purpose: "",
        content: ""
    });

    const fetchCalculateData = () => {
        axios.get("/households/index_data")
        .then(response => {
            setCalculateData(response.data.event);
            indexSpending(response.data.spending_data);
        })
        .catch(error => {
            console.error("Error fetching calendar data:", error);
        });
    };

    useEffect(() => {
        fetchCalculateData();
    }, []);

    // 収入、収支の反映
    const indexIncome = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setIncomeData(value);
    };

    const saveIncome = () => {
        setSaveIncomeData(incomeData);
        // ローカルストレージに保存
        localStorage.setItem('saveIncomeData', incomeData);
    };

    const indexSpending = (spend) => {
        let sum_data = 0;
        spend.map((amount) => (
            sum_data += amount
        ));
        setSpendingData(sum_data);
    };

    const setForm = () => {       
        setFormSpendingData(true);
    };

    const closeSpendingForm = () => {
        setFormSpendingData(false);
    };

    const enterFormData = (event) => {
        const { name, value } = event.target;
        setFormDataInput({ ...formDataInput, [name]: value });
    };

    const submitForm = (event) => {
        event.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        axios.post("/households/save_data", { event: formDataInput }, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        .then(response => {
            console.log('Event saved:', response.data);
            setFormSpendingData(false);
            fetchCalculateData();
        })
        .catch(error => {
            console.error("Error saving event", error);
        });
            
    };

    const clearForm = (id) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        axios.post("/households/delete_data", { id: id }, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        .then(response => {
            console.log('Event deleted:', response.data);
            fetchCalculateData();
        })
        .catch(error => {
            console.error("Error deleting event", error);
        });
    }



    return(
        <SDiv>
            <div>
                <SDivWrap>
                    <SH2>月の収入を入力</SH2>
                    <SInput type="number" onChange={indexIncome}/>
                    <SIncomeButton onClick={saveIncome} >保存</SIncomeButton>
                </SDivWrap>
                <STable>
                    <SThead>
                        <tr>
                            <SThFirst>収入</SThFirst>
                            <SThFirst>支出</SThFirst>
                            <SThFirst>収支計</SThFirst>
                        </tr>
                    </SThead>
                    <STbody>
                        <tr>
                            <STd>{saveIncomeData}</STd>
                            <STd>{spendingData}</STd>
                            <STd>{saveIncomeData - spendingData}</STd>
                        </tr>
                    </STbody>
                </STable>
            </div>
            <div>
                <SSaveButton onClick={setForm}>データの記録をする</SSaveButton>
                {formSpendingData && (
                    <SForm onSubmit={submitForm}>
                        <SFormDiv>
                            <SLabel htmlFor="item">支出先</SLabel>
                            <SFormInput type="text" id="item" name="item" value={formDataInput.item} placeholder="何に使ったかを記入" onChange={enterFormData}/>
                        </SFormDiv>
                        <SFormDiv>
                            <SLabel htmlFor="amount">金額</SLabel>
                            <SFormInput type="number" id="amount" name="amount" value={formDataInput.amount} placeholder="購入金額を記入" onChange={enterFormData}/>
                        </SFormDiv>
                        <SFormDiv>
                            <SLabel htmlFor="purpose">用途</SLabel>
                            <SFormInput type="text" id="purpose" name="purpose" value={formDataInput.purpose} placeholder="例：食費 家賃など" onChange={enterFormData}/>
                        </SFormDiv>
                        <SFormDiv>
                            <SLabel htmlFor="content">コメント</SLabel>
                            <SFormInput type="text" id="content" name="content" value={formDataInput.content} placeholder="購入日など、メモがあれば記述" onChange={enterFormData}/>
                        </SFormDiv>
                        
                        <SFormButton type="submit">データを記録する</SFormButton>
                    </SForm>
                )}
            </div>
            <SMainDiv>
                <SMainTable>
                    <SThead>
                        <tr>
                            <STh>日付</STh>
                            <STh>支出先</STh>
                            <STh>金額</STh>
                            <STh>用途</STh>
                            <STh>コメント</STh>
                            <SThButton></SThButton>
                        </tr>
                    </SThead>
                    <STbody>
                        {calculateData.map((event, index) => (
                            <STr key={index}>
                                <STd>{event.date}</STd>
                                <STd>{event.item}</STd>
                                <STd>{event.amount}</STd>
                                <STd>{event.purpose}</STd>
                                <STd>{event.content}</STd>
                                <STdButton>
                                    <SButton onClick={() => clearForm(event.id)}>削除</SButton>
                                </STdButton>
                            </STr>
                        ))}
                    </STbody>
                </SMainTable>
            </SMainDiv>
            {formSpendingData && (
                <SFalseButton onClick={closeSpendingForm} >×</SFalseButton>
            )}
            
        </SDiv>
    )
};

const SForm = styled.form`
    z-index: 50;
    width: 50%;
    height: 60%;
    position: fixed;
    top: 150px;
    left: 150px;
    background: linear-gradient(45deg, #B67B03 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #B67B03 90% 100%);
    padding-top: 20px;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    @media screen and (max-width:500px){
        width:95%;
        position: fixed;
        top: 130px;
        left: 5px;
    }
`

const SLabel = styled.label`
    display:block;
    width:20%;
    height: 25px;
    font-size: 16px;
    font-weight:bold;
`

const SFormInput = styled.input`
    width: 70%;
    height: 25px;
    display: block;
    padding: 10px 16px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%);
    font-size: 16px;
    font-weight: bold;
    resize: none;
    opacity: 0.9;
`

const SFormButton = styled.button`
    width:300px;
    color:black;
    font-weight:bold;
    background: linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%);
    box-shadow: 0 3px #808080;
    border-radius: 5px;
    border: 1px solid black;
    margin-top:15px;
`

const SFormDiv = styled.div`
    display: flex;
    justify-content: around-between;
    align-items: center;
    padding:0 10%;
    margin-bottom: 20px;
`

const SFalseButton = styled.button`
    z-index: 50;
    position: fixed;
    top: 130px;
    right: 450px;
    width: 40px;
    color: black;
    background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
    box-shadow: 0 3px #808080;
    border-radius: 10px;
    border: 1px solid black;
    @media screen and (max-width:500px){
        position: fixed;
        top: 130px;
        right: 10px;
    }
`

const SDiv = styled.div`
    position: absolute;
    top: 150px;
    left: 25px;
    width: 90%;
    background: linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%);
    opacity: 0.8;
    border-radius: 5px;
    padding: 20px 30px;
    @media screen and (max-width:500px){
        width:95%;
        position: absolute;
        top: 150px;
        left: 5px;
        padding: 15px 5px;
    }
`

const SH2 = styled.h2`
    margin-right: 10px;
    font-weight: bold;
`

const SIncomeButton = styled.button`
    width:50px;
    margin-left: 10px;
    text-decoration: none;
    color: #000000;
    height: 20px;
    font-size: 12px;
    letter-spacing: normal;
    font-weight: bold;
    background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
    box-shadow: 0 3px #808080;
    border-radius: 5px;
    border: 1px solid black;
`

const SInput = styled.input`
    width: 300px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
    @media screen and (max-width:500px){
        width:150px;
    }
`

const SDivWrap = styled.div`
    width:100%;
    display:flex;
`

const STable = styled.table`
    width:50%;
    border:1px solid black;
    background-color:rgba(204, 204, 153, 0.8);
    margin: 10px 0 ;
`

const SThead = styled.thead`

`

const SSaveButton = styled.button`
    width:400px;
    margin-top: 15px;
    text-decoration: none;
    color: #000000;
    height: 40px;
    font-size: 24px;
    letter-spacing: normal;
    font-weight: bold;
    background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
    box-shadow: 0 3px #808080;
    border-radius: 10px;
    border: 1px solid black;
    @media screen and (max-width:500px){
        width:200px;
        height: 20px;
        font-size: 12px;
    }
`


const STbody = styled.tbody`
    white-space: pre-wrap;
`

const SMainDiv = styled.div`
    height: 300px;
    overflow-y: scroll;
    margin-top: 20px;
    border: 1px solid black;

`

const SMainTable = styled.table`
    width: 100%;
    background-color: rgba(204, 204, 153, 0.8);

`

const STr = styled.tr`
    height: 50px;
`

const STh = styled.th`
    text-align: center;
    border: 1px solid black;
    border-bottom: 5px double black;
    background-color: #CCCC66;
    width:calc(93% / 5);
    @media screen and (max-width:500px){
        font-size:10px;
    }
`

const SThButton = styled.th`
    text-align: center;
    border: 1px solid black;
    border-bottom: 5px double black;
    background-color: #CCCC66;
    width: 7%;
`

const SThFirst = styled.th`
    text-align: center;
    border: 1px solid black;
    border-bottom: 5px double black;
    background-color: #CCCC66;
    width:calc(100% / 3);
    @media screen and (max-width:500px){
        font-size:10px;
    }
`

const STd = styled.td`
    border: 1px solid black;
    text-align: right;
    padding-right: 15px;
    @media screen and (max-width:500px){
        font-size:10px;
        padding-right: 5px;
    }
`

const STdButton = styled.td`
    border: 1px solid black;
    text-align: center;
    @media screen and (max-width:500px){
        font-size:10px;
    }
`

const SButton = styled.button`

`

export default ReactCalculate;
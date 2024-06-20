import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReactToDo = () => {
    const [formView, setFormView] = useState(false);
    const [formDataInput, setFormDataInput] = useState({
        rank: "",
        content: ""
    });
    const [goalForm, setGoalForm] = useState(false);
    const [goalData, setGoalData] = useState(() => {
        const savedGoal = localStorage.getItem('goalData');
        return savedGoal ? savedGoal : "";
    });
    const [toDoData, setToDoData] = useState([]);

    const indexToDoData = () => {
        axios.get("/to_dos/index_data")
        .then( response => {
            setToDoData(response.data.event)
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }

    useEffect(() => {
        indexToDoData();
    }, []);

    const goalSet = () => {
        setGoalForm(true);
    };

    const indexGoal = (event) => {
        const value = event.target.value;
        setGoalData(value);
    };
    
    const saveGoal = () => {
        localStorage.setItem('goalData', goalData);
        setGoalForm(false); 
    };

    const listSet = () => {
        setFormView(true)
    }

    const enterFormData = (event) => {
        const { name, value } = event.target;
        setFormDataInput({ ...formDataInput, [name]: value });
    };

    const submitForm = (event) => {
        event.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        axios.post("/to_dos/save_data", { event: formDataInput }, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        .then(response => {
            console.log('Event saved:', response.data);
            indexToDoData();
            setFormView(false);
            setFormDataInput({
                rank: "",
                content: ""
            });
        })
        .catch(error => {
            console.error("Error saving event", error);
        });
            
    };

    const clearData = (id) =>{
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        axios.post("/to_dos/delete_data", { id: id }, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        })
        .then(response => {
            console.log('Event deleted:', response.data);
            indexToDoData();
        })
        .catch(error => {
            console.error("Error deleting event", error);
        });
    }


    return(
        <SDiv>
            <SGoalDiv>
                <div>
                    <SButton onClick={goalSet}>今月の目標を設定</SButton>
                    { goalForm && (
                        <div>
                            <input type="text" onChange={indexGoal}/>
                            <button onClick={saveGoal} >保存</button>
                        </div>
                    ) }
                </div>
                <SGoalTextDiv>
                    {goalData}
                </SGoalTextDiv>
            </SGoalDiv>
            <div>
                <SListButton onClick={listSet} >今日やるべきことをリストに追加</SListButton>
                { formView && (
                    <SForm onSubmit={submitForm}>
                        <SFormDiv>
                            <SLabel htmlFor="rank">優先順位</SLabel>
                            <SFormInput type="number" id="rank" name="rank" value={formDataInput.rank} placeholder="1~10のうち優先順位を記述" onChange={enterFormData}/>
                        </SFormDiv>

                        <SFormDiv>
                            <SLabel htmlFor="content">やるべきこと</SLabel>
                            <SFormInput type="text" id="content" name="content" value={formDataInput.content} placeholder="タスクを記述" onChange={enterFormData}/>
                        </SFormDiv>
                        
                        <SFormButton type="submit">データを記録する</SFormButton>
                    </SForm>
                ) }
            </div>
            <SMainDiv>
                <SMainTable>
                    <STbody>
                    {toDoData.length > 0 ? toDoData.map((event, index) => (
                        <STr key={index}>
                            <STdRank>{event.rank}</STdRank>
                            <STd>{event.content}</STd>
                            <STd>
                                <STdButton onClick={() => clearData(event.id)}>削除</STdButton>
                            </STd>
                        </STr>
                    )) : (<tr colSpan="3" ><td> </td></tr>)}
                    </STbody>
                </SMainTable>
            </SMainDiv>
        </SDiv>
    )

};

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

const STdRank = styled.td`
    width: 10%;
    border: 1px solid black;
    text-align: right;
    padding-right: 15px;
    @media screen and (max-width:500px){
        font-size:10px;
        padding-right: 5px;
    }
`


const STd = styled.td`
    width: 80%;
    border: 1px solid black;
    text-align: left;
    padding-left: 10px;
    @media screen and (max-width:500px){
        font-size:10px;
        padding-right: 5px;
    }
`

const STdButton = styled.button`
    width: 4em;
    border: 1px solid black;
    text-align: center;
    border-radius: 4px;
    @media screen and (max-width:500px){
        font-size:10px;
    }
`




const SDiv = styled.div`
    height: 800px;
    padding:200px;
    @media screen and (max-width:500px){
        padding: 150px 40px;
    }    
`


const SForm = styled.form`
    z-index: 50;
    width: 50%;
    height: 40%;
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


const SButton = styled.button`
    width: 12em;
    padding: 0.5em 1em;
    font-size: 18px;
    background: linear-gradient(45deg, #B67B03 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #B67B03 90% 100%);
    margin-bottom: 30px;
    margin-top:30px;
`

const SListButton = styled.button`
    width: 18em;
    padding: 0.5em 1em;
    font-size: 18px;
    background: linear-gradient(45deg, #B67B03 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #B67B03 90% 100%);
`

const SGoalDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    @media screen and (max-width:500px){
        display: contents;
        margin-bottom: 15px;
    }
`

const SGoalTextDiv = styled.div`
    margin-left: 30px;
    font-size: 40px;
    background: linear-gradient(to bottom right, #FFF9E6, #d0A900);
    border-radius: 4px;
    padding: 1px 10px;
    @media screen and (max-width:500px){
        margin-left: 0;
        margin-bottom: 15px;
        font-size: 30px;
    }
`

export default ReactToDo;
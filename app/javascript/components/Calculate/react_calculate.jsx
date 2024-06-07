import React, { useState,useEffect } from 'react';
import axios from 'axios';


const ReactCalculate = () => {
    const [incomeData, setIncomeData] = useState(0);
    const [spendingData, setSpendingData] = useState(0);
    const [paymentData, setPaymentData] = useState(0);
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
    }

    useEffect(() => {
        fetchCalculateData()
    ,[]});
    
    //収入、収支の反映
    const indexIncome = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setIncomeData(value);
        setPaymentData(value - spendingData);
    };

    const indexSpending = (spend) => {
        sum_data = 0
        spend.map((amount) => (
            sum_data += amount
        ))
        setSpendingData(sum_data);
        setPaymentData(incomeData - sum_data);
    }

    const setForm = () => {       
        setFormSpendingData(true)
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



    return(
        <div>
            <div>
                <div>
                    <h2>月の収入を入力</h2>
                    <input type="number" onChange={indexIncome}/>
                    <button>保存</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>収入</th>
                            <th>支出</th>
                            <th>収支計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{incomeData}</td>
                            <td>{spendingData}</td>
                            <td>{paymentData}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={setForm}>データの記録をする</button>
                {formSpendingData && (
                    <form onSubmit={submitForm}>
                        <label htmlFor="item">支出先</label>
                        <input type="text" id="item" name="item" value={formDataInput.item} placeholder="何に使ったかを記入" onChange={enterFormData}/>
                        <label htmlFor="amount">金額</label>
                        <input type="number" id="amount" name="amount" value={formDataInput.amount} placeholder="購入金額を記入" onChange={enterFormData}/>
                        <label htmlFor="purpose">用途</label>
                        <input type="text" id="purpose" name="purpose" value={formDataInput.purpose} placeholder="例：食費 家賃など" onChange={enterFormData}/>
                        <label htmlFor="content">コメント</label>
                        <input type="text" id="content" name="content" value={formDataInput.content} placeholder="購入日など、メモがあれば記述" onChange={enterFormData}/>
                        <button type="submit">データを記録する</button>
                    </form>
                )}
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>日付</th>
                            <th>支出先</th>
                            <th>金額</th>
                            <th>用途</th>
                            <th>コメント</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculateData.map((event, index) => (
                            <tr key={index}>
                                <td>{event.date}</td>
                                <td>{event.item}</td>
                                <td>{event.amount}</td>
                                <td>{event.purpose}</td>
                                <td>{event.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ReactCalculate;
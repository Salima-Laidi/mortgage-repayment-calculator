import { useState } from 'react'
import { useForm } from "react-hook-form"
import calculatorIcon from '../assets/images/icon-calculator.svg'
import illustration from '../assets/images/illustration-empty.svg'
import Error from "./components/error.jsx"
import Results from "./components/results.jsx"

function App() {
  const { register, handleSubmit, setValue, formState:{errors} } = useForm();
  // we give useState null because at the beggining there is not data object, it will be created after the submission of the form 
  const[result, setResult] = useState(false);
  const [data, setData] = useState(null);
  // const[clear, setClear] = useState(false);
  function submit(formData){
    setData(formData);
    setResult(true);
  }
  function numbersOnly(e){
    // replace doesn't change the original value, it returns a new string with the changes, so we need to set the value of the input to the new string that only contains numbers
    // we use target and not value directly because e is not the input element, it's the event object that contains a reference to the input element in its target property, so we need to access the value through e.target.value
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
  }
  function clearForm(){
    setValue("amount", "");
    setValue("term", "");
    setValue("rate", "");
    setValue("option", "");
    setResult(false);
  }
  return (
    <div className='h-screen w-screen md:bg-slate-100 md:flex md:justify-center md:items-center'>
      <div className="md:w-[50%] bg-white grid md:grid-cols-2 grid-cols-1 overflow-hidden md:rounded-3xl">
        <div className="p-8">
          <div className="flex justify-between mb-6">
            <h1 className="font-primary text-slate-900 font-bold text-xl">Mortgage Calculator</h1>
              <button className="text-slate-700 font-medium font-primary underline underline-offset-4 cursor-pointer text-md hover:text-slate-900 hover:cursor-pointer transition duration-300" onClick={clearForm}>Clear All</button>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <label for="mortgage-amount" className="custom-label">
              Mortgage Amount
              <div className={`container group hover:border-lime hover:cursor-pointer transition duration-300 ${errors.amount && "border-red" }`}>
                <span className={`custom-span group-hover:bg-lime transition duration-300 ${errors.amount && "bg-red text-white" }`}>£</span>
                <input type="text" id="mortgage-amount" className="custom-input" {...register("amount",{required:true})} onChange={numbersOnly}/>
              </div>
              {errors.amount && <Error/>}
            </label>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 ">
              <label for="mortgage-term" className="custom-label">
                Mortgage Term
                <div className={`container group hover:border-lime hover:cursor-pointer transition duration-300 ${errors.term && "border-red" }`}>
                  <input type="text" id="mortgage-term" className="custom-input"  {...register("term",{required:true})} onChange={numbersOnly}/>
                  <span className={`custom-span group-hover:bg-lime transition duration-300 ${errors.term && "bg-red text-white" }`}>Years</span>
                </div>
              {errors.term && <Error/>}
              </label>

              <label for="interest-rate" className="custom-label">
                Interest Rate
                <div className={`container group hover:border-lime hover:cursor-pointer transition duration-300 ${errors.rate && "border-red" }`}>
                  <input type="text" id="interest-rate" className="custom-input"  {...register("rate",{required:true})} onChange={numbersOnly}/>
                  <span className={`custom-span group-hover:bg-lime transition duration-300 ${errors.rate && "bg-red text-white" }`}>%</span>
                </div>
              {errors.rate && <Error/>}

              </label>
            </div>
            
            <h2 className="custom-label"> 
              Mortgage Type
            </h2>
            <div className="container2 hover:border-lime hover:cursor-pointer [&:has([type='radio']:checked)]:bg-lime/20 [&:has([type='radio']:checked)]:border-lime transition duration-300">
              {/* we need to fix the radio value so we can store it in the handle submit, and no need to set the error on all options, set it only for one will work on all of them */}
              <input type="radio" name="option" id="repayment" className="w-4 h-4  accent-lime" value="repayment" {...register("option",{required:true})}/>
              <label htmlFor="repayment" className="custom-label2">Repayment</label>
            </div>
            <div className="container2 hover:border-lime hover:cursor-pointer [&:has([type='radio']:checked)]:bg-lime/20 [&:has([type='radio']:checked)]:border-lime transition duration-300">
              <input type="radio" name="option" id="interest" className="w-4 h-4  accent-lime" value="interest" {...register("option")}/>
              <label htmlFor="interest" className="custom-label2">Interest Only</label>
            </div>
              {errors.option && <Error/>}

            <button type="submit" className="w-full md:w-auto bg-lime flex gap-2 items-center py-3 px-8 rounded-full font-primary font-bold mt-8 hover:bg-lime/50 hover:cursor-pointer transition duration-300" > 
              <img src={calculatorIcon} className="w-5 h-5"/>
              Calculate Repayments
            </button>
          </form>
        </div> 

        {!result?
        <div className="bg-slate-900 md:rounded-bl-[60px] flex justify-center items-center flex-col gap-4 p-4">
          <img  src={illustration} className="w-[200px] h-[200px]"/>
          <h2 className="text-white text-xl font-bold font-primary "> Results shown here</h2>
          <p className="text-slate-300 text-center font-primary">Complete the form and click “calculate repayments” to see what 
          your monthly repayments would be.</p>
        </div>
        : <Results amount = {data.amount} term = {data.term} rate= {data.rate} option={data.option}/> 
      }
      </div>
    </div>
  )
}

export default App;

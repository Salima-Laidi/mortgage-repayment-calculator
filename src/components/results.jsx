function Results({amount, term, rate, option}) {
    const p = amount;
    const r = rate;
    const t = term;
    const i = (r/100)/12;
    const n = t * 12;
    function payment(p,i,n){
        let result;
        let total;
        if(option === "repayment"){
            result = p* ((i*(i+1)**n)/(((i+1)**n) - 1));
            total = result * n;
        }else{
            result = p* i;
            total = result * n;
        }
        return [result, total]
    }
    let [result, total] = payment(p,i,n);
    return(
        <div className="bg-slate-900 md:rounded-bl-[60px]  p-8">
            <h2 className="text-white text-xl font-bold  mb-2 font-primary">Your results</h2>
            <p className="text-slate-300 font-primary mb-8">Your results are shown below based on the information you provided. 
            To adjust the results, edit the form and click “calculate repayments” again.</p>

            <div className="w-full bg-slate-950 p-6 rounded-lg border-t-4 border-t-lime border-t-solid"> 
                <p className='text-slate-300 mb-4 font-primary'>Your monthly repayments</p>
                <p className='text-lime text-5xl font-bold font-primary'>£{result.toFixed(2)}</p>
                <hr className="border-slate-300/30 border-t-1 my-6"/>
                <p className="text-slate-300 font-primary mb-2">Total you'll repay over the term</p>
                <p className="text-white text-2xl font-bold font-primary">£{total.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default Results;
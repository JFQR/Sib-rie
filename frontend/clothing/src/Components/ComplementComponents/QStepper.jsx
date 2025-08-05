//Quantity stepper component
function QStepper({ quantity, setQuantity, availability }){


    function toRest(){
        if(quantity > 1 ){
            setQuantity(prev => prev -1)
        }
    }

    function toAdd(){
        if(quantity < availability){
            setQuantity(prev => prev +1)
        }
    }

    return(<>
        <div className="stepper-container">
            <button onClick={toRest}>-</button>
            <span>{quantity}</span>
            <button onClick={toAdd}>+</button>
        </div>
    </>)
}export default QStepper
import { checkToken } from "../../utilities/users-service"

export default function OrderHistoryPage(){
    async function handleCheckToken(){
        checkToken()        
    }

    return (
        <>
            <h2>Order history page</h2>
            <button onClick={handleCheckToken}>Check when my login expires</button>
        </>
    )
}
import { Link } from "react-router-dom"


export const CartConfirmPage = () => {
  return (
    <div>
      <div className="lg:relative lg:flex">

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]">
          <div className="lg:max-w-[640px] lg:mx-auto">

            {/* Msg*/}
            <div className="mb-6 lg:mb-0">
              <div className="mb-3">
                <div className="flex text-sm font-medium text-slate-400 space-x-2">
                  <span className="text-slate-500">Review</span>
                  <span>-&gt;</span>
                  <span className="text-slate-500">Payment</span>
                  <span>-&gt;</span>
                  <span className="text-indigo-500">Confirm</span>
                </div>
              </div>
              <header className="mb-6">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">Thank you for your order ✨</h1>
                <p>You will soon receive a confirmation email with details of your order.</p>
              </header>

              {/* Button Link to Status Order */}
              <div className="mt-6">
                <Link to="/customer/" className="text-sm font-medium text-indigo-500 hover:text-indigo-600">Go to status order -&gt;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Truck, RefreshCw, AlertCircle } from 'lucide-react'

export default function ReturnExchangePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Returns and Exchanges</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Policy</h2>
          <p className="mb-4">
            We want you to love your purchase, but if you're not completely satisfied, we're here to help.
            You can return or exchange your item within 30 days of receipt.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Return or Exchange</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Log in to your account and go to your order history.</li>
            <li>Select the item(s) you wish to return or exchange.</li>
            <li>Choose whether you want a refund or an exchange.</li>
            <li>Print the prepaid return label.</li>
            <li>Pack the item(s) securely and attach the return label.</li>
            <li>Drop off the package at your nearest post office or schedule a pickup.</li>
          </ol>
        </section>
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <Truck className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free Returns</h3>
            <p>We offer free returns on all orders. Simply use the prepaid return label provided.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <RefreshCw className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Exchanges</h3>
            <p>Want a different size or color? Our easy exchange process has got you covered.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Conditions</h3>
            <p>Items must be unworn, unwashed, and in the same condition you received them with all tags attached.</p>
          </div>
        </section>
      </div>
    </div>
  )
}


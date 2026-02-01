export default function SizeGuide() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="mb-8 text-center text-4xl font-bold text-primary">
          Vodič za veličine
        </h2>

        <div className="overflow-x-auto rounded-lg bg-gray-50 p-6 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="pb-4 text-lg font-semibold text-primary">
                  Veličina
                </th>
                <th className="pb-4 text-lg font-semibold text-primary">
                  Visina (cm)
                </th>
                <th className="pb-4 text-lg font-semibold text-primary">
                  Težina (kg)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-4 text-lg font-medium text-gray-900">S</td>
                <td className="py-4 text-gray-600">160-168</td>
                <td className="py-4 text-gray-600">50-65</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 text-lg font-medium text-gray-900">M</td>
                <td className="py-4 text-gray-600">168-175</td>
                <td className="py-4 text-gray-600">58-70</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 text-lg font-medium text-gray-900">L</td>
                <td className="py-4 text-gray-600">175-185</td>
                <td className="py-4 text-gray-600">65-80</td>
              </tr>
              <tr>
                <td className="py-4 text-lg font-medium text-gray-900">XL</td>
                <td className="py-4 text-gray-600">155-190</td>
                <td className="py-4 text-gray-600">80-100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

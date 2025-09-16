import React from 'react';

const PcodInfo = () => {
  return (
    <div className="w-full bg-white py-20 px-4 md:px-16 shadow-inner">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-6">
          Understanding Polycystic Ovary Syndrome (PCOS)
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-4xl mx-auto">
          PCOS is a complex hormonal disorder affecting millions of women worldwide. It can manifest in a variety of ways, impacting not just your reproductive health, but your entire well-being.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Key Characteristics</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Irregular or absent periods</li>
              <li>Increased androgen levels (male hormones)</li>
              <li>Polycystic ovaries (on ultrasound)</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Common Symptoms</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Weight gain or difficulty losing weight</li>
              <li>Acne and oily skin</li>
              <li>Excessive hair growth (hirsutism)</li>
              <li>Thinning hair on the scalp</li>
              <li>Fatigue and mood changes</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Long-Term Impact</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Insulin resistance and type 2 diabetes</li>
              <li>Increased risk of cardiovascular disease</li>
              <li>Mental health challenges like anxiety and depression</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcodInfo;
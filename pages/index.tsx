
import { useState } from 'react';

export default function RemedyFinder() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const handleChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const remedies = [
      {
        name: "Wild Lettuce",
        conditions: ["sleep", "anxiety", "pain"],
        caution: "May cause drowsiness. Avoid mixing with sedatives.",
        preparation: "Extract or tincture."
      },
      {
        name: "Shamrock (Oxalis)",
        conditions: ["bloating", "digestive aid", "fever"],
        caution: "Contains oxalic acid — avoid daily or heavy use.",
        preparation: "Dry and brew sparingly as tea or chew raw."
      },
      {
        name: "Plantain",
        conditions: ["bloating", "respiratory", "indigestion"],
        caution: "Safe unless overused.",
        preparation: "Chew fresh leaves, salve, or tea."
      }
    ];
    const matches = remedies.filter(remedy =>
      remedy.conditions.some(c => answers[c])
    );
    setResults(matches);
  };

  return (
    <div
      className="p-4 max-w-2xl mx-auto min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <h1 className="text-4xl font-bold text-center drop-shadow-lg mt-4">
        DUNCAN APOTHECARY
      </h1>

      <div className="bg-white bg-opacity-80 p-4 rounded-xl text-black my-4 max-w-xl mx-auto">
        <p className="text-lg font-semibold">
          Hi! I'm your apothecary guide.
        </p>
        <p className="text-md">Let's walk through some wellness questions.</p>
      </div>

      {["sleep", "anxiety", "bloating"].map(key => (
        <div key={key} className="mb-4">
          <p className="capitalize">Do you experience {key.replace("_", " ")}?</p>
          <label><input type="radio" name={key} onChange={() => handleChange(key, true)} /> Yes</label>
          <label><input type="radio" name={key} onChange={() => handleChange(key, false)} className="ml-4" /> No</label>
        </div>
      ))}

      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-700 rounded">
        Get Herbal Suggestions
      </button>

      <div className="mt-6">
        {results.length === 0 && <p>No remedies matched yet.</p>}
        {results.map((remedy, i) => (
          <div key={i} className="mb-4 p-4 bg-green-900 bg-opacity-70 rounded">
            <h3 className="text-xl font-bold">{remedy.name}</h3>
            <p><strong>Helps with:</strong> {remedy.conditions.join(", ")}</p>
            <p><strong>Preparation:</strong> {remedy.preparation}</p>
            <p><strong>Caution:</strong> {remedy.caution}</p>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-sm text-white">
        <p className="italic">Need help with something specific? Type it in the next version of this app!</p>
        <p className="mt-2">Disclaimer: For educational use only. Not medical advice.</p>
      </footer>
    </div>
  );
}

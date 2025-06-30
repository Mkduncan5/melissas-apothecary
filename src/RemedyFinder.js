import { useState } from 'react';
import './index.css';

const questions = [
  { text: "Do you have trouble sleeping?", key: "sleep" },
  { text: "Do you feel anxious often?", key: "anxiety" },
  { text: "Do you experience frequent bloating?", key: "bloating" }
];

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

export default function RemedyFinder() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [specific, setSpecific] = useState("");
  const [specificResult, setSpecificResult] = useState("");

  const handleChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const matches = remedies.filter(remedy =>
      remedy.conditions.some(c => answers[c])
    );
    setResults(matches);
  };

  const handleSpecificSearch = () => {
    const match = remedies.find(remedy =>
      remedy.conditions.some(c => specific.toLowerCase().includes(c))
    );
    setSpecificResult(match ? match : { name: "No match found", conditions: [], preparation: "N/A", caution: "N/A" });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src="/ai-twin.png" alt="AI Twin" width="80" style={{ borderRadius: "50%", marginRight: "10px" }} />
        <div>
          <h1>Herbal Remedy Recommender</h1>
          <p>Hi, I’m your apothecary guide. Let’s walk through some questions together.</p>
        </div>
      </div>

      {questions.map(q => (
        <div key={q.key}>
          <p>{q.text}</p>
          <label><input type="radio" name={q.key} onChange={() => handleChange(q.key, true)} /> Yes</label>
          <label><input type="radio" name={q.key} onChange={() => handleChange(q.key, false)} style={{ marginLeft: '10px' }} /> No</label>
        </div>
      ))}

      <button onClick={handleSubmit}>Get Herbal Suggestions</button>

      <div>
        <h2>Suggestions</h2>
        {results.map((remedy, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{remedy.name}</h3>
            <p><strong>Helps with:</strong> {remedy.conditions.join(", ")}</p>
            <p><strong>Preparation:</strong> {remedy.preparation}</p>
            <p><strong>Caution:</strong> {remedy.caution}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Need help with something specific?</h3>
        <input type="text" value={specific} onChange={(e) => setSpecific(e.target.value)} placeholder="e.g. menstrual cramps, cough..." />
        <button onClick={handleSpecificSearch}>Find Match</button>

        {specificResult && specificResult.name && (
          <div style={{ marginTop: '20px', border: '1px solid #aaa', padding: '10px' }}>
            <h3>{specificResult.name}</h3>
            <p><strong>Helps with:</strong> {specificResult.conditions.join(", ")}</p>
            <p><strong>Preparation:</strong> {specificResult.preparation}</p>
            <p><strong>Caution:</strong> {specificResult.caution}</p>
          </div>
        )}
      </div>

      <footer style={{ marginTop: '50px', fontSize: '14px', color: 'gray' }}>
        <p><strong>Disclaimer:</strong> This app is for educational purposes only and not medical advice.</p>
      </footer>
    </div>
  );
}

const { useState } = React;

const irregularVerbs = [
  { base: "be", past: "was/were", participle: "been", cz: "být" },
  { base: "become", past: "became", participle: "become", cz: "stát se" },
  { base: "begin", past: "began", participle: "begun", cz: "začít" },
  { base: "break", past: "broke", participle: "broken", cz: "zlomit/rozbít" },
  { base: "bring", past: "brought", participle: "brought", cz: "přinést" },
  { base: "build", past: "built", participle: "built", cz: "stavět/postavit" },
  { base: "buy", past: "bought", participle: "bought", cz: "koupit" },
  { base: "choose", past: "chose", participle: "chosen", cz: "vybrat" },
  { base: "come", past: "came", participle: "come", cz: "přijít/přijet" },
  { base: "cut", past: "cut", participle: "cut", cz: "řezat" },
  { base: "do", past: "did", participle: "done", cz: "dělat" },
  { base: "drink", past: "drank", participle: "drunk", cz: "pít" },
  { base: "drive", past: "drove", participle: "driven", cz: "řídit" },
  { base: "eat", past: "ate", participle: "eaten", cz: "jíst" },
  { base: "find", past: "found", participle: "found", cz: "najít" },
  { base: "fly", past: "flew", participle: "flown", cz: "létat" },
  { base: "forget", past: "forgot", participle: "forgotten", cz: "zapomenout" },
  { base: "get", past: "got", participle: "gotten", cz: "dostat" },
  { base: "give", past: "gave", participle: "given", cz: "dát" },
  { base: "go", past: "went", participle: "gone", cz: "jít/jet" },
  { base: "have", past: "had", participle: "had", cz: "mít" },
  { base: "hear", past: "heard", participle: "heard", cz: "slyšet" },
  { base: "know", past: "knew", participle: "known", cz: "znát/vědět" },
  { base: "learn", past: "learned/learnt", participle: "learned/learnt", cz: "učit se" },
  { base: "leave", past: "left", participle: "left", cz: "odejít" },
  { base: "lose", past: "lost", participle: "lost", cz: "ztratit" },
  { base: "make", past: "made", participle: "made", cz: "dělat/vyrábět" },
  { base: "mean", past: "meant", participle: "meant", cz: "znamenat" },
  { base: "meet", past: "met", participle: "met", cz: "potkat" },
  { base: "pay", past: "paid", participle: "paid", cz: "platit" },
  { base: "put", past: "put", participle: "put", cz: "dát/položit" },
  { base: "quit", past: "quit", participle: "quit", cz: "skončit" },
  { base: "read", past: "read", participle: "read", cz: "číst" },
  { base: "say", past: "said", participle: "said", cz: "říct" },
  { base: "see", past: "saw", participle: "seen", cz: "vidět" },
  { base: "sell", past: "sold", participle: "sold", cz: "prodat" },
  { base: "send", past: "sent", participle: "sent", cz: "poslat" },
  { base: "set", past: "set", participle: "set", cz: "nastavit" },
  { base: "shine", past: "shone", participle: "shone", cz: "svítit" },
  { base: "sleep", past: "slept", participle: "slept", cz: "spát" },
  { base: "speak", past: "spoke", participle: "spoken", cz: "mluvit" },
  { base: "spend", past: "spent", participle: "spent", cz: "utratit/strávit" },
  { base: "steal", past: "stole", participle: "stolen", cz: "krást" },
  { base: "take", past: "took", participle: "taken", cz: "vzít/brát" },
  { base: "teach", past: "taught", participle: "taught", cz: "učit" },
  { base: "tell", past: "told", participle: "told", cz: "říct/říkat" },
  { base: "think", past: "thought", participle: "thought", cz: "myslet" },
  { base: "throw", past: "threw", participle: "thrown", cz: "házet/hodit" },
  { base: "understand", past: "understood", participle: "understood", cz: "rozumět" },
  { base: "wake up", past: "woke up", participle: "woken up", cz: "vzbudit se" },
  { base: "win", past: "won", participle: "won", cz: "vyhrát" },
  { base: "write", past: "wrote", participle: "written", cz: "psát" }
];

function Icon({ name, className }) {
  React.useEffect(() => {
    lucide.createIcons();
  });
  return React.createElement('i', { 'data-lucide': name, className });
}

function App() {
  const [mode, setMode] = useState('study');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({ past: '', participle: '' });
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState(null);
  const [usedVerbs, setUsedVerbs] = useState([]);

  const currentVerb = mode === 'quiz' && usedVerbs.length > 0 
    ? irregularVerbs[usedVerbs[currentIndex]] 
    : irregularVerbs[currentIndex];

  const getRandomVerb = () => {
    if (usedVerbs.length === irregularVerbs.length) {
      setUsedVerbs([]);
      return 0;
    }
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * irregularVerbs.length);
    } while (usedVerbs.includes(randomIndex));
    return randomIndex;
  };

  const startQuiz = () => {
    setMode('quiz');
    const firstVerb = getRandomVerb();
    setUsedVerbs([firstVerb]);
    setCurrentIndex(0);
    setQuizAnswers({ past: '', participle: '' });
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
  };

  const checkAnswer = () => {
    const verb = irregularVerbs[usedVerbs[currentIndex]];
    const pastCorrect = quizAnswers.past.trim().toLowerCase() === verb.past.toLowerCase();
    const participleCorrect = quizAnswers.participle.trim().toLowerCase() === verb.participle.toLowerCase();
    const isCorrect = pastCorrect && participleCorrect;

    setFeedback({
      correct: isCorrect,
      pastCorrect,
      participleCorrect,
      correctPast: verb.past,
      correctParticiple: verb.participle
    });

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const nextVerb = () => {
    if (mode === 'study') {
      setCurrentIndex((prev) => (prev + 1) % irregularVerbs.length);
      setShowAnswer(false);
    } else {
      const nextVerbIndex = getRandomVerb();
      setUsedVerbs(prev => [...prev, nextVerbIndex]);
      setCurrentIndex(prev => prev + 1);
      setQuizAnswers({ past: '', participle: '' });
      setFeedback(null);
    }
  };

  const previousVerb = () => {
    if (mode === 'study') {
      setCurrentIndex((prev) => (prev - 1 + irregularVerbs.length) % irregularVerbs.length);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    setMode('study');
    setCurrentIndex(0);
    setShowAnswer(false);
    setQuizAnswers({ past: '', participle: '' });
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setUsedVerbs([]);
  };

  return (
    
      
        
          
            
              
              {' Irregular Verbs Practice'}
            
            {mode === 'quiz' && (
              
                
                
                  {score.correct}/{score.total}
                
              
            )}
          

          
            <button
              onClick={() => mode === 'quiz' ? resetQuiz() : null}
              disabled={mode === 'study'}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                mode === 'study'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {'Study Mode'}
            
            <button
              onClick={startQuiz}
              disabled={mode === 'quiz'}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                mode === 'quiz'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {'Quiz Mode'}
            
          

          {mode === 'study' ? (
            
              
                
                  {'Verb '}{currentIndex + 1}{' of '}{irregularVerbs.length}
                
                
                  {'Infinitive'}
                  {currentVerb.base}
                  {currentVerb.cz}
                
              

              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  {'Show Forms'}
                
              ) : (
                
                  
                    {'Past Simple'}
                    {currentVerb.past}
                  
                  
                    {'Past Participle'}
                    {currentVerb.participle}
                  
                
              )}

              
                
                  {'Previous'}
                
                
                  {'Next'}
                
              
            
          ) : (
            
              
                
                  {'Question '}{currentIndex + 1}
                
                
                  {'Infinitive'}
                  {currentVerb.base}
                  {currentVerb.cz}
                
              

              {!feedback ? (
                
                  
                    
                      {'Past Simple'}
                    
                    <input
                      type="text"
                      value={quizAnswers.past}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, past: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                      placeholder="Enter past simple form"
                    />
                  
                  
                    
                      {'Past Participle'}
                    
                    <input
                      type="text"
                      value={quizAnswers.participle}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, participle: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                      placeholder="Enter past participle form"
                    />
                  
                  
                    {'Check Answer'}
                  
                
              ) : (
                
                  
                    
                      {feedback.correct ? (
                        <>
                          
                          {'Correct!'}
                        </>
                      ) : (
                        <>
                          
                          {'Not quite'}
                        </>
                      )}
                    
                    
                    {!feedback.correct && (
                      
                        
                          {'Past Simple:'}
                          {feedback.correctPast}
                        
                        
                          {'Past Participle:'}
                          {feedback.correctParticiple}
                        
                      
                    )}
                  

                  
                    
                      
                      {'Reset'}
                    
                    
                      {'Next Verb'}
                    
                  
                
              )}
            
          )}
        

        
          {'Total verbs in database: '}{irregularVerbs.length}
        
      
    
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
);
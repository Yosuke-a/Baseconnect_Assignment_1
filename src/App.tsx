import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Post from './post';
import './index.css'; 

interface Job {
  id: number;
  title: string;
  category: string;
  salary: string;
}

interface CheckboxProps {
  value: string;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

interface DropdownListProps {
  selectedSalary: number;
  setSelectedSalary: React.Dispatch<React.SetStateAction<number>>;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, selectedCategories, setSelectedCategories }) => {
  const BoxChecker = () => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={selectedCategories.includes(value)}
        onChange={BoxChecker}
      />
      <label>{value}</label>
    </div>
  );
};

const DropdownList: React.FC<DropdownListProps> = ({ selectedSalary, setSelectedSalary }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSalary = parseInt(event.target.value, 10);
    setSelectedSalary(selectedSalary); 
  };

  return (
    <>
      <form action="#" className="m-2 items-center">
        <label htmlFor="salary-select">年収を選択</label>
        <select id="salary-select" onChange={handleSelectChange} value={selectedSalary}>
          <option value={300}>300万円以上</option>
          <option value={500}>500万円以上</option>
          <option value={700}>700万円以上</option>
          <option value={1000}>1000万円以上</option>
        </select>
      </form>
    </>
  );
};

const App: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<number>(300);  // 年収の選択を管理

  const jobs: Job[] = [
    { id: 1, title: "経験者歓迎!大手企業でのWebエンジニア募集", category: "エンジニア", salary: "600万円" },
    { id: 2, title: "未経験OK!営業アシスタント急募", category: "営業", salary: "350万円" },
    { id: 3, title: "グローバル企業でのマーケティングマネージャー", category: "マーケティング", salary: "800万円" },
    { id: 4, title: "UI/UXデザイナー急募!急成長中のスタートアップ", category: "デザイン", salary: "550万円" },
    { id: 5, title: "大手製造業での生産管理スペシャリスト", category: "製造", salary: "650万円" },
    { id: 6, title: "急成長ベンチャー企業での経理マネージャー募集", category: "財務・経理", salary: "700万円" },
    { id: 7, title: "大手IT企業での人事担当者募集", category: "人事", salary: "500万円" },
    { id: 8, title: "外資系企業でのカスタマーサポート担当募集", category: "カスタマーサポート", salary: "400万円" },
    { id: 9, title: "看護師募集!大学病院での勤務", category: "医療・介護", salary: "550万円" },
    { id: 10, title: "一般事務スタッフ募集!週3日からOK", category: "事務", salary: "300万円" },
  ];

  const filteredJobs = jobs.filter((job) => {
    const salaryValue = parseInt(job.salary.replace('万円', ''), 10);
    const salaryMatch = salaryValue >= selectedSalary;
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(job.category);
    
    return salaryMatch && categoryMatch;
  });

  return (
    <Router>
      <div className="App">
        <nav className="flex justify-between items-center p-4 bg-blue-900 h-16 text-white">
          <header className="text-xl">求人検索アプリ</header>
          <ul className="flex space-x-4">
            <li><a href="">求人検索</a></li>
            <li><Link to="/post">求人投稿</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex min-h-screen">
                <div className="w-1/3 bg-gray-200 min-h-screen">
                  <h1 className="p-2">求人カテゴリ</h1>
                  <div className="ps-8">
                    <Checkbox value="事務" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                    <div><Checkbox value="エンジニア" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="営業" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="デザイン" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="マーケティング" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="財務・経理" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="人事" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="カスタマーサポート" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="製造" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                    <div><Checkbox value="医療・介護" selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} /></div>
                  </div>
                  <h1 className="p-2">年収</h1>
                  <DropdownList selectedSalary={selectedSalary} setSelectedSalary={setSelectedSalary} />
                </div>
                <div className="w-2/3 min-h-screen m-1">
                  <h1>求人一覧</h1>
                  <p>該当件数: {filteredJobs.length}件</p>
                  {filteredJobs.map(job => (
                    <div key={job.id} className="border px-4 py-4 shadow-lg shadow-gray-300 rounded-2xl m-2">
                      <p>{job.title}</p>
                      <br />
                      <p>カテゴリ: {job.category}</p>
                      <br />
                      <p>年収: {job.salary}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

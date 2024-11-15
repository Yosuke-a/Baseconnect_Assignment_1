import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Option {
  value: string;
}

const options: Option[] = [
  { value: '事務' },
  { value: 'エンジニア' },
  { value: '営業' },
  { value: 'デザイン' },
  { value: 'マーケティング' },
  { value: '財務・経理' },
  { value: '人事' },
  { value: 'カスタマーサポート' },
  { value: '製造' },
  { value: '医療・介護' },
];

const Post: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const navigate = useNavigate();
  
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle form submission logic here (e.g., saving the post)
    navigate('/');
  };

  return (
    <div>
      <h1>求人投稿</h1>
      <form onSubmit={submit}>
        <p>求人カテゴリ選択</p>
        <select 
          value={value} 
          onChange={handleCategoryChange} 
          className="bg-white border border-gray-300 rounded p-2 mb-4"
        >
          <option value="">選択してください</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>

        <p className="mb-2">年収(万円)</p>
        <input 
          type="text" 
          value={salary} 
          onChange={handleSalaryChange} 
          className="bg-white border border-gray-300 rounded p-2 mb-4 w-40"
        />

        <p>求人タイトル</p>
        <input 
          type="text" 
          value={title} 
          onChange={handleTitleChange} 
          className="bg-white border border-gray-300 rounded p-2 mb-4 w-5/6"
        />

        <p>
          <input 
            type="submit" 
            value="投稿" 
            className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer" 
          />
        </p>
      </form>
    </div>
  );
};

export default Post;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AdoptionOkListWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const GalleryItem = styled.div`
  /* width: calc(33.33% - 20px); */
  border: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const AdoptionOkList = () => {
  const [dogs, setDogs] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    city: '',
    breed: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // 여기에 공공데이터포털의 유기동물 API를 호출하여 데이터를 가져오는 코드 작성
    // 예: fetchDogs(filters);
    // 데이터를 가져와서 setDogs로 상태 업데이트
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleDogClick = (dogId) => {
    // 개별 유기견 상세 정보 페이지로 이동하는 등의 동작 구현
    // 예: window.location.href = `/dogs/${dogId}`;
  };

  return (
    <AdoptionOkListWrapper>
      <h2>입양 가능한 유기견 목록</h2>
      <FilterSection>
        <label>Date:</label>
        <input
          type="text"
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
        />
        <label>City:</label>
        <input
          type="text"
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
        />
        <label>Breed:</label>
        <input
          type="text"
          value={filters.breed}
          onChange={(e) => handleFilterChange('breed', e.target.value)}
        />
      </FilterSection>
      <GalleryWrapper>
        {dogs.map((dog) => (
          <GalleryItem key={dog.id} onClick={() => handleDogClick(dog.id)}>
            <img src={dog.image} alt={dog.name} />
            <p>{dog.name}</p>
            <p>종   {dog.breed}</p>
            <p>{dog.gender}</p>
            <p>{dog.neutered ? 'Neutered' : 'Not neutered'}</p>
            <p>{dog.age} years old</p>
            <p>{dog.weight} kg</p>
            <p>{dog.color}</p>
          </GalleryItem>
        ))}
      </GalleryWrapper>
      <button onClick={ () => {
        navigate("/board/adoptionOk/write");
      } }>작성하기</button>
    </AdoptionOkListWrapper>
  );
};

export default AdoptionOkList;

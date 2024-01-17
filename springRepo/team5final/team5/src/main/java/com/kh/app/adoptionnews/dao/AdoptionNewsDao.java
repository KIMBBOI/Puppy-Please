package com.kh.app.adoptionnews.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoptionnews.vo.AdoptionNewsVo;

@Repository
public class AdoptionNewsDao {
	
	// 입양 후 소식 작성 (사진)
	public int newsImageWrite(SqlSessionTemplate sst, AdoptionNewsVo vo) {

		System.out.println("DAO > vo (사진) : " + vo);
		
		return sst.insert("AdoptionNewsMapper.newsImageWrite", vo);
	}

//	public int write(SqlSessionTemplate sst, AdoptionNewsVo vo) {
//		return sst.insert("AdoptionNewsMapper.write", vo);
//	}

	// 입양 후 소식 목록
	public List<AdoptionNewsVo> list(SqlSessionTemplate sst) {
//		System.out.println("에러확인 dao : " + sst.selectList("AdoptionNewsMapper.list"));
		return sst.selectList("AdoptionNewsMapper.list");
	}

	// 입양 후 소식 상세 조회
	public AdoptionNewsVo detail(SqlSessionTemplate sst, String no) {
		return sst.selectOne("AdoptionNewsMapper.detail", no);
	}

	// 입양 후 소식 수정
	public int edit(SqlSessionTemplate sst, AdoptionNewsVo vo) {
		return sst.update("AdoptionNewsMapper.edit", vo);
	}

	// 입양 후 소식 삭제
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("AdoptionNewsMapper.delete", no);
	}

	

	

	

}

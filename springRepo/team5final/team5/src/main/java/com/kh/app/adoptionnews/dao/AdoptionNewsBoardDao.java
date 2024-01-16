package com.kh.app.adoptionnews.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoptionnews.vo.AdoptionNewsVo;

@Repository
public class AdoptionNewsBoardDao {

	public int newsBoardWrite(SqlSessionTemplate sst, AdoptionNewsVo vo) {
		return sst.insert("AdoptionNewsMapper.boardWrite");
	}
	
}

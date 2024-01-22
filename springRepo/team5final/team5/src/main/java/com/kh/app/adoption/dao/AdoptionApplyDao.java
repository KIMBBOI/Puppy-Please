package com.kh.app.adoption.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoption.vo.ApplyVo;

@Repository
public class AdoptionApplyDao {

	public int insertApply(SqlSessionTemplate sst, ApplyVo vo) {
		return sst.insert("ApplyMapper.insert", vo);
	}

	
}

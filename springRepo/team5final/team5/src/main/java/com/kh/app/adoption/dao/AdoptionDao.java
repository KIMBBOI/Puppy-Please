package com.kh.app.adoption.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoption.vo.AdoptionVo;

@Repository
public class AdoptionDao {

	//�Ծ� �Խñ� �ۼ�
	public int insert(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.insert("AdoptionMapper", vo);
	}

}

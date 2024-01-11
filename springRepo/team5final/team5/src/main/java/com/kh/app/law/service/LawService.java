import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.app.law.dao.LawRepository;
import com.kh.app.law.vo.LawVo;

import java.util.List;
import java.util.Optional;

@Service
public class LawService {

    @Autowired
    private LawRepository lawRepository;

    public List<LawVo> getLawList() {
        return lawRepository.findAll();
    }

    public LawVo getLawById(Long id) {
        Optional<LawVo> law = lawRepository.findById(id);
        return law.orElse(null);
    }

    public LawVo createLaw(LawVo law) {
        return lawRepository.save(law);
    }

    public LawVO updateLaw(Long id, LawVo updatedLaw) {
        Optional<LawVO> existingLawOptional = lawRepository.findById(id);
        if (existingLawOptional.isPresent()) {
            LawVO existingLaw = existingLawOptional.get();
            // Update existingLaw fields with values from updatedLaw
            existingLaw.setTitle(updatedLaw.getTitle());
            existingLaw.setContent(updatedLaw.getContent());
            // ... Update other fields as needed

            return lawRepository.save(existingLaw);
        } else {
            return null;
        }
    }

    public boolean deleteLaw(Long id) {
        if (lawRepository.existsById(id)) {
            lawRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}

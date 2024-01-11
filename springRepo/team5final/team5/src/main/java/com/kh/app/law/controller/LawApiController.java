import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.law.service.LawService;
import com.kh.app.law.vo.LawVo;

import java.util.List;

@RestController
@RequestMapping("/api/laws")
public class LawApiController {

    @Autowired
    private final LawService service;

    @GetMapping
    public ResponseEntity<List<LawVo>> getLawList() {
        List<LawVo> lawList = service.getLawList();
        return new ResponseEntity<>(lawList, HttpStatus.OK);
    }

    // 추가로 필요한 메서드들에 대한 엔드포인트를 작성

    // 예시: 추가로 필요한 메서드 getLawById에 대한 엔드포인트
    @GetMapping("/{id}")
    public ResponseEntity<LawVo> getLawById(@PathVariable Long id) {
        LawVo law = service.getLawById(id);
        if (law != null) {
            return new ResponseEntity<>(law, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 예시: 추가로 필요한 메서드 createLaw에 대한 엔드포인트
    @PostMapping
    public ResponseEntity<LawVo> createLaw(@RequestBody LawVo law) {
        LawVo createdLaw = service.createLaw(law);
        return new ResponseEntity<>(createdLaw, HttpStatus.CREATED);
    }

    // 예시: 추가로 필요한 메서드 updateLaw에 대한 엔드포인트
    @PutMapping("/{id}")
    public ResponseEntity<LawVo> updateLaw(@PathVariable Long id, @RequestBody LawVO law) {
        LawVo updatedLaw = service.updateLaw(id, law);
        if (updatedLaw != null) {
            return new ResponseEntity<>(updatedLaw, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 예시: 추가로 필요한 메서드 deleteLaw에 대한 엔드포인트
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaw(@PathVariable Long id) {
        if (service.deleteLaw(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

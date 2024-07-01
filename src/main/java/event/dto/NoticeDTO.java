package event.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDTO {
    private String empId;
    private String title;
    private String content;
    private String hyperlink;
    private String image;
    private String weeklyImage;
}

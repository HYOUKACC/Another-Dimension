package thumbnails;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.junit.Test;

public class ThumbnailTest {

    @Test
    public void test() {
        try {

        Thumbnails.of("C:\\Users\\2009\\Desktop\\images\\qq.jpg")
                .scale(1f)
                .outputQuality(0.5f).toFile("C:\\Users\\2009\\Desktop\\images2\\qq.jpg");
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}

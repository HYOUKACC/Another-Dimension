package imgesURL;

public class ImgesURL {
    private long imges_id;
    private String imges_name;
    private String imges_url;
    private String imges_note;

    @Override
    public String toString() {
        return "ImgesURL{" +
                "imges_id=" + imges_id +
                ", imges_name='" + imges_name + '\'' +
                ", imges_url='" + imges_url + '\'' +
                ", imges_note='" + imges_note + '\'' +
                '}';
    }

    public long getImges_id() {
        return imges_id;
    }

    public void setImges_id(long imges_id) {
        this.imges_id = imges_id;
    }

    public String getImges_name() {
        return imges_name;
    }

    public void setImges_name(String imges_name) {
        this.imges_name = imges_name;
    }

    public String getImges_url() {
        return imges_url;
    }

    public void setImges_url(String imges_url) {
        this.imges_url = imges_url;
    }

    public String getImges_note() {
        return imges_note;
    }

    public void setImges_note(String imges_note) {
        this.imges_note = imges_note;
    }
}

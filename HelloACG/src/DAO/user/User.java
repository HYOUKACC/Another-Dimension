package DAO.user;

public class User {
    private long number;
    private String userId;
    private String password;
    private String nickName;
    private String profilePictureURL;

    public String getProfilePictureURL() {
        return profilePictureURL;
    }

    public void setProfilePictureURL(String profilePictureURL) {
        this.profilePictureURL = profilePictureURL;
    }

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    @Override
    public String toString() {
        return "User{" +
                "number=" + number +
                ", userId='" + userId + '\'' +
                ", password='" + password + '\'' +
                ", nickName='" + nickName + '\'' +
                ", profilePictureURL='" + profilePictureURL + '\'' +
                '}';
    }
}

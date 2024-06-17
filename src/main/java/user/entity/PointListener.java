//package user.entity;
//
//import jakarta.persistence.PostPersist;
//import jakarta.persistence.PostRemove;
//import jakarta.persistence.PostUpdate;
//
//public class PointListener {
//
//    @PostPersist
//    @PostUpdate
//    @PostRemove
//    public void updateUserTotalPoints(Point point){
//        User user = point.getUser();
//        user.updateTotalPoints();
//    }
//}

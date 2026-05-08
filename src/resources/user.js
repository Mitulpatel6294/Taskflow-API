class UserResource {
    static toResponse(user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}
export default UserResource;
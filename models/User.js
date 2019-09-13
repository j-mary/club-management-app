import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/**
 *
 *
 * @param {function} next
 * @returns {function} next
 */
function softDeleteMiddleware(next) {
  const filter = this.getQuery();
  if (filter.isDeleted == null) {
    filter.isDeleted = false;
  }
  next();
}

userSchema.pre('find', softDeleteMiddleware);
userSchema.pre('findOne', softDeleteMiddleware);

userSchema.statics.findBySlug = function(slug, cb) {
  return this.findOne({ slug }, cb);
};

const User = mongoose.model('User', userSchema);

export default User;

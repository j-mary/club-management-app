import mongoose from 'mongoose';

const { Schema } = mongoose;

const clubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: String,
      required: true,
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

clubSchema.pre('find', softDeleteMiddleware);
clubSchema.pre('findOne', softDeleteMiddleware);

clubSchema.statics.findBySlug = function(slug, cb) {
  return this.findOne({ slug }, cb);
};

const Club = mongoose.model('Club', clubSchema);

export default Club;

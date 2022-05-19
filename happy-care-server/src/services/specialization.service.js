const _ = require('lodash');
const Specialization = require('../models/specialization.model');

const createSpecialization = async ({ user, createBody }) => {
  try {
    // authorizate adminstrator
    if (user.role !== 'admin') {
      throw {
        status: 400,
        message: 'unauthorized for people have no adminstrator role',
      };
    }
    const specialization = Specialization(createBody);
    await specialization.save();

    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message,
    };
  }
};

const addSpecializationForUser = async ({ user, specializations }) => {
  try {
    if (user.role === 'admin') {
      throw {
        status: 400,
        message: "admin doesn't have this permission",
      };
    }

    user.specializations = [];
    for (let specialization of specializations) {
      const isExist = await Specialization.findOne({
        name: specialization.name,
      });

      if (!isExist) {
        throw {
          status: 400,
          message:
            'please check again, it have one specialization is not valid',
        };
      }

      user.specializations = [...user.specializations, specialization.name];
    }

    await user.save();
    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message,
    };
  }
};

const getAllSpecializations = async () => {
  try {
    const specializations = await Specialization.find({});

    return { specializations };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSpecializationsBySymptomKeyword = async (keys) => {
  try {
    const symptomKeywords = keys.split(',');
    if (symptomKeywords.length === 0) {
      throw {
        status: 400,
        message: 'please check again',
      };
    }
    
    if (symptomKeywords.length > 2) {
      const specializations = await Specialization.find({}).lean();
      let filterSpecializations = specializations.map((spec) => {
        if (spec && spec.keywords) {
          spec.keywords.forEach((keyword, index) => {
            spec.keywords[index] = keyword.toString();
          });
          if (_.intersection(spec.keywords, symptomKeywords).length >= 2) {
            return spec;
          }
        }
      });
      filterSpecializations = filterSpecializations.filter(
        (spec) => spec !== undefined
      );
      return { specializations: filterSpecializations };
    } else {
      const specializations = await Specialization.find({ keywords: { $in: symptomKeywords } }).lean();
      return { specializations };
    }
  } catch (error) {
    throw {
      status: 500,
      message: 'please check again',
    };
  }
};

const updateSpecialization = async ({
  user,
  updateFields,
  updateBody,
  specializationId,
}) => {
  try {
    // authorizate adminstrator
    if (user.role !== 'admin') {
      throw {
        status: 400,
        message: 'unauthorized for people have no adminstrator role',
      };
    }

    // handler
    const specialization = await Specialization.findById(specializationId);

    if (!specialization) {
      throw {
        status: 404,
        message: 'specialization not found',
      };
    }
    const allowedUpdate = ['name', 'description', 'keywords'];

    const isValidOperator = updateFields.every((update) =>
      allowedUpdate.includes(update)
    );

    if (!isValidOperator) {
      throw {
        status: 400,
        message: 'please check again, it have one field is not valid',
      };
    }

    updateFields.forEach((update) => {
      specialization[update] = updateBody[update];
    });

    await specialization.save();

    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message,
    };
  }
};

const deleteSpecialization = async ({ user, specializationId }) => {
  try {
    // authorizate adminstrator
    if (user.role !== 'admin') {
      throw {
        status: 400,
        message: 'unauthorized for people have no adminstrator role',
      };
    }

    // handler
    const specialization = await Specialization.findByIdAndDelete(
      specializationId
    );

    if (!specialization) {
      throw {
        status: 404,
        message: 'specialization not found',
      };
    }

    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message,
    };
  }
};

// custome function
const getAllSpecializationIds = async () => {
  const { specializations } = await getAllSpecializations();
  return specializations.map((spec) => spec._id.toString());
};

const getSpecNameById = async ({ specId }) => {
  const specializations = await Specialization.findById(specId);
  return specializations.name;
};

const getSpecIdByName = async ({ specName }) => {
  const { specializations } = await Specialization.findOne({ name: specName });
  return specializations.map((spec) => spec._id.toString());
};

module.exports = {
  createSpecialization,
  addSpecializationForUser,
  getAllSpecializations,
  getSpecializationsBySymptomKeyword,
  updateSpecialization,
  deleteSpecialization,
  getAllSpecializationIds,
  getSpecNameById,
  getSpecIdByName,
};

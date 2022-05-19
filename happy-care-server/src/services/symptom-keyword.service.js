const SymptomKeyword = require('../models/symptom-keyword.model');

const createSymptomKeyword = async ({ names, user }) => {
  try {
    // authorizate adminstrator
    if (user.role !== 'admin') {
      throw {
        status: 400,
        message: 'unauthorized for people have no adminstrator role',
      };
    }

    names.forEach(async (name) => {
      const keyword = SymptomKeyword({ name });
      await keyword.save();
    });

    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message,
    };
  }
};

const getAllSymptomKeywords = async () => {
  try {
    const keywords = await SymptomKeyword.find({});
    delete keywords.__v;
    delete keywords.createdAt;
    delete keywords.updatedAt;

    return { keywords };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSymptomKeywordById = async (id) => {
  try {
    const keyword = await SymptomKeyword.findById(id);
    delete keyword.__v;
    delete keyword.createdAt;
    delete keyword.updatedAt;

    return { keyword };
  } catch (error) {
    throw new Error(error.message);
  }
}

const updateSymptomKeywordById = async (id, name, user) => {
  try {
    // authorizate adminstrator
    if (user.role !== 'admin') {
      throw {
        status: 400,
        message: 'unauthorized for people have no adminstrator role',
      };
    }

    await SymptomKeyword.findByIdAndUpdate(id, { name });
    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message,
    };
  }
}

const deleteSymptomKeywordById = async (id, user) => {
  try {
    // authorizate adminstrator
    if (user.role !== 'admin') {
      throw {
        status: 400,
        message: 'unauthorized for people have no adminstrator role',
      };
    }

    await SymptomKeyword.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw {
      status: 500,
      message: error.message,
    };
  }
}

module.exports = {
  createSymptomKeyword,
  getAllSymptomKeywords,
  getSymptomKeywordById,
  updateSymptomKeywordById,
  deleteSymptomKeywordById,
};

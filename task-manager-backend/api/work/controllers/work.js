"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let filteredWork;
    filteredWork = await strapi.services.work.find({
      ...ctx.query,
      user: ctx.state.user.id,
      _sort: "date:desc",
    });

    let allWork;
    allWork = await strapi.services.work.find({
      user: ctx.state.user.id,
      _sort: "date:desc",
    });

    let totalHours = {};

    // for each date we add up the total hours worked on that date
    allWork.forEach((work) => {
      totalHours[work.date] = totalHours[work.date]
        ? totalHours[work.date] + work.duration
        : work.duration;
    });

    return {
      totalHours,
      log: filteredWork.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.work })
      ),
    };
  },
  async create(ctx) {
    let entity;

    ctx.request.body.user = ctx.state.user.id;
    entity = await strapi.services.work.create(ctx.request.body);

    return sanitizeEntity(entity, { model: strapi.models.work });
  },
};

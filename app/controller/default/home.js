'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '123123123';
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.image as image,' +
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d') as addTime," +
              'article.view_count as viewCount,' +
              'type.name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }

  async getArticleListByTypeId() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.image as image,' +
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d') as addTime," +
              'article.view_count as viewCount,' +
              'type.name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.type_id=' + id;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    const articleId = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              'article.content as articleContent,' +
              "FROM_UNIXTIME(article.add_time, '%Y-%m-%d') as addTime," +
              'article.view_count as viewCount,' +
              'type.id as typeId,' +
              'type.name as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.id ' +
              'WHERE article.id=' + articleId;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async updateArticle() {
    const article = this.ctx.request.body;
    const result = await this.app.mysql.update('article', article);
    const updateSuccess = result.affectedRows === 1;

    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = HomeController;

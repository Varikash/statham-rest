import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from './quote.schema';

@Injectable()
export class QuotesService {
    constructor(@InjectModel(Quote.name) private quoteModel: Model<Quote>) {}

    async addQuote(text: string): Promise<Quote> {
        const newQuote = new this.quoteModel({ text });
        return newQuote.save();
    }

    async getRandomQuote(): Promise<Quote | null> {
        const count = await this.quoteModel.countDocuments();
        const random = Math.floor(Math.random() * count);
        return this.quoteModel.findOne().skip(random).exec();
    }

    async getAllQuotes(): Promise<Quote[]> {
        return this.quoteModel.find().exec();
    }
}
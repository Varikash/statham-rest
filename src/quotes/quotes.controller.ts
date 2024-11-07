import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard'
import { QuotesService } from './quotes.service';
import * as process from "node:process";

@Controller()
export class QuotesController {
    constructor(private readonly quotesService: QuotesService) {}

    @Post('suggest-quote')
    async suggestQuote(@Body('text') text: string) {
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `/suggest ${text}`,
                }),
            });
            return { status: 'Цитата отправлена на модерацию' };
        } catch (error) {
            return { status: 'Ошибка отправки в Телеграм', error: error.message };
        }
    }

    @Post('quote')
    @UseGuards(AuthGuard)
    async addQuote(@Body('text') text: string) {
        return this.quotesService.addQuote(text);
    }

    @Get('quote')
    async getRandomQuote() {
        return this.quotesService.getRandomQuote();
    }

    @Get('quotes')
    async getAllQuotes() {
        return this.quotesService.getAllQuotes();
    }
}
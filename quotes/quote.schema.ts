import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quote extends Document {
    @Prop({ required: true })
    text: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
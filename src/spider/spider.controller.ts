import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpiderService } from './spider.service';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { log } from 'console';
import { write, writeFile } from 'fs';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}

  @Post()
  create(@Body() createSpiderDto: CreateSpiderDto) {
    return this.spiderService.create(createSpiderDto);
  }

  @Get()
  async findAll() {
    const data: Array<any> = [];

    const getCos = async (i) => {
      const body = await axios
        .get(`http://ciyuandao.com/cosers/list/0-0-0-0-0-${i}`)
        .then((res) => res.data);
      const $ = cheerio.load(body);
      $('.coser .fleft .face img').each(function () {
        data.push({
          face: $(this).attr('src'),
        });
      });
      i++;
    };
    for (let i = 1; i <= 100; i++) {
      await getCos(i);
      console.log('爬取完成', data);
    }
    writeFile('./data.json', JSON.stringify(data), (err) => {});
    return data.length;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spiderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpiderDto: UpdateSpiderDto) {
    return this.spiderService.update(+id, updateSpiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spiderService.remove(+id);
  }
}

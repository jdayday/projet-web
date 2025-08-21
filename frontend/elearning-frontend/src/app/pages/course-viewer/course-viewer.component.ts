import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.scss']
})
export class CourseViewerComponent implements OnInit {
  courseContent: any;
  selectedLesson: any;
  safeVideoUrl: SafeResourceUrl | null = null;
  private currentLessonIndex = -1;
  private lessons: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    if (courseId) {
      this.courseService.getCourseContent(courseId).subscribe(data => {
        this.courseContent = data;
        this.initializeLessons();
        if (this.lessons.length > 0) {
          this.selectLesson(this.lessons[0]);
        }
      });
    }
  }

  private initializeLessons(): void {
    this.lessons = [];
    if (this.courseContent && this.courseContent.chapters) {
      this.courseContent.chapters.forEach((chapter: any) => {
        if (chapter.lessons) {
          chapter.lessons.forEach((lesson: any) => {
            lesson.completed = false; 
            this.lessons.push(lesson);
          });
        }
      });
    }
  }

  selectLesson(lesson: any) {
    this.selectedLesson = lesson;
    this.currentLessonIndex = this.lessons.findIndex(l => l === lesson);
    
    if (lesson.videoUrl) {
      const vimeoUrl = `https://player.vimeo.com/video/${lesson.videoUrl}`;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vimeoUrl);
    } else {
      this.safeVideoUrl = null;
    }
  }

  toggleLessonCompletion(lesson: any) {
    lesson.completed = !lesson.completed;
  }

  previousLesson() {
    if (this.currentLessonIndex > 0) {
      this.selectLesson(this.lessons[this.currentLessonIndex - 1]);
    }
  }

  nextLesson() {
    if (this.currentLessonIndex < this.lessons.length - 1) {
      this.selectLesson(this.lessons[this.currentLessonIndex + 1]);
    }
  }

  isFirstLesson(): boolean {
    return this.currentLessonIndex === 0;
  }

  isLastLesson(): boolean {
    return this.currentLessonIndex === this.lessons.length - 1;
  }
}